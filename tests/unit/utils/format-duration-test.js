import formatDuration from 'time-tracker/utils/format-duration';
import { module, test } from 'qunit';

module('Unit | Utility | format duration');

test('it works', function(assert) {
  let result = formatDuration(100);
  assert.equal(result, '00:01:40');
});
