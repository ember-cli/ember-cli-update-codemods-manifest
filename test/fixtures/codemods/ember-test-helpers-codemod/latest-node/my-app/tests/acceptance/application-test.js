import { currentURL, visit } from '@ember/test-helpers';
import { test } from 'qunit';
import moduleForAcceptance from 'my-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('visiting /', async function(assert) {
  await visit('/');

  assert.equal(currentURL(), '/');
});
