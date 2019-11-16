'use strict';

const { expect } = require('chai');

module.exports.assertNoUnstaged = function(status) {
  expect(status).to.not.match(/^.\w/m);
};

module.exports.assertNoStaged = function(status) {
  expect(status).to.not.match(/^\w/m);
};

module.exports.assertCodemodRan = function(status) {
  // codemod changed locally, no change upstream
  expect(status).to.match(/^M {2}.*app\/controllers\/application\.js$/m);

  // codemod changed locally, also changed upstream
  expect(status).to.match(/^M {2}.*app\/router\.js$/m);
};
