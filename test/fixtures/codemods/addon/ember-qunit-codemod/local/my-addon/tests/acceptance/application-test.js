import { test } from 'qunit';
import moduleForAcceptance from 'my-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
