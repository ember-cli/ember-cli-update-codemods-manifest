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
const manifest = require('../manifest');

const codemods = Object.keys(manifest);

describe('runs codemods', function() {
  this.timeout(5 * 60 * 1000);

  let tmpPath;

  async function merge({
    fixturesPath,
    commitMessage,
    beforeMerge = () => Promise.resolve()
  }) {
    tmpPath = await buildTmp({
      fixturesPath
    });

    await beforeMerge();

    return processBin({
      bin: 'ember-cli-update',
      args: [
        '--run-codemods',
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

  // eslint-disable-next-line mocha/no-setup-in-describe
  for (let i = 0; i < codemods.length; i++) {
    // eslint-disable-next-line mocha/no-setup-in-describe
    let codemod = codemods[i];

    it(codemod, async function() {
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
        fixturesPath: 'test/fixtures/local',
        commitMessage: 'my-app',
        runCodemods: true,
        async beforeMerge() {
          await _merge('local', tmpPath);
        }
      });

      ps.stdout.on('data', data => {
        let str = data.toString();
        if (str.includes('These codemods apply to your project.')) {
          let down = '\u001b[B';
          let space = ' ';
          let enter = '\n';
          ps.stdin.write(`${down.repeat(i)}${space}${enter}`);
        }
      });

      let {
        status
      } = await promise;

      // file is indeterminent between OS's, so ignore
      await fs.remove(path.join(tmpPath, 'MODULE_REPORT.md'));

      let nodeVersion = 'latest-node';
      if (process.env.NODE_LTS) {
        nodeVersion = 'min-node';
      }

      let mergeFixtures = await buildTmp({
        fixturesPath: 'test/fixtures/local',
        noGit: true
      });

      await _merge(nodeVersion, mergeFixtures);

      fixtureCompare({
        mergeFixtures
      });

      assertNoUnstaged(status);
      assertCodemodRan(status);
    });
  }
});
