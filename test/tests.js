'use strict';

const fs = require('fs-extra');
const path = require('path');
const { expect } = require('chai');
const {
  buildTmp,
  processBin,
  fixtureCompare: _fixtureCompare
} = require('git-fixtures');
const {
  assertNoUnstaged,
  assertCodemodRan
} = require('./helpers/assertions');

let manifest;
let fixturesPath;
let commitMessage;
if (process.env.TEST_TYPE === 'addon') {
  manifest = require('ember-addon-codemods-manifest');
  fixturesPath = 'test/fixtures/addon';
  commitMessage = 'my-addon';
} else {
  manifest = require('ember-app-codemods-manifest');
  fixturesPath = 'test/fixtures/app';
  commitMessage = 'my-app';
}

const codemods = Object.keys(manifest);

describe('runs codemods', function() {
  this.timeout(5 * 60 * 1000);

  let tmpPath;
  let applicableCodemods;

  async function merge({
    statsOnly,
    beforeMerge = () => Promise.resolve()
  }) {
    tmpPath = await buildTmp({
      fixturesPath
    });

    await beforeMerge();

    return processBin({
      bin: 'ember-cli-update',
      args: [
        statsOnly ? '--stats-only' : '--run-codemods',
        `--codemods-json='${JSON.stringify(manifest)}'`
      ],
      cwd: tmpPath,
      commitMessage,
      expect
    });
  }

  function fixtureCompare({
    mergeFixtures
  }) {
    let actual = tmpPath;
    let expected = mergeFixtures;

    _fixtureCompare({
      expect,
      actual,
      expected
    });
  }

  async function getApplicableCodemods() {
    let {
      ps,
      promise
    } = await merge({
      statsOnly: true
    });

    ps.stdout.pipe(process.stdout);

    let stdout = '';

    ps.stdout.on('data', data => {
      stdout += data.toString();
    });

    await promise;

    let applicableCodemods = stdout.match(/^applicable codemods: (.+)$/m)[1].split(', ');

    return applicableCodemods;
  }

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  before(async function() {
    applicableCodemods = await getApplicableCodemods();
  });

  for (let codemod of codemods) {
    it(codemod, async function() {
      if (!applicableCodemods.includes(codemod)) {
        this.skip();
        return;
      }

      async function _merge(src, dest) {
        await fs.copy(
          path.join(__dirname, `fixtures/codemods/${codemod}/${src}/my-app`),
          dest,
          {
            overwrite: true,
            recursive: true
          }
        );
      }

      let {
        ps,
        promise
      } = await merge({
        async beforeMerge() {
          await _merge('local', tmpPath);
        }
      });

      ps.stdout.pipe(process.stdout);

      function stdoutData(data) {
        let str = data.toString();
        if (str.includes('These codemods apply to your project.')) {
          let down = '\u001b[B';
          let space = ' ';
          let enter = '\n';
          let i = applicableCodemods.indexOf(codemod);
          ps.stdin.write(`${down.repeat(i)}${space}${enter}`);

          ps.stdout.removeListener('data', stdoutData);
        }
      }

      ps.stdout.on('data', stdoutData);

      let {
        status
      } = await promise;

      assertNoUnstaged(status);
      assertCodemodRan(status);

      // file is indeterminent between OS's, so ignore
      await fs.remove(path.join(tmpPath, 'MODULE_REPORT.md'));

      let nodeVersion = 'latest-node';
      if (process.env.NODE_LTS) {
        nodeVersion = 'min-node';
      }

      let mergeFixtures = await buildTmp({
        fixturesPath,
        noGit: true
      });

      await _merge(nodeVersion, mergeFixtures);

      fixtureCompare({
        mergeFixtures
      });
    });
  }
});
