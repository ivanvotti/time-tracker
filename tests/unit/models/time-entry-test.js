import { moduleForModel, test } from 'ember-qunit';

moduleForModel('time-entry', 'Unit | Model | time entry', {
  needs: [
    'model:tag'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
