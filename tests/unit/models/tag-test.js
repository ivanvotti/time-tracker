import { moduleForModel, test } from 'ember-qunit';

moduleForModel('tag', 'Unit | Model | tag', {
  needs: [
    'model:time-entry'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
