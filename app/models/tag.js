import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-pouch/model';

export default Model.extend({
  name: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  timeEntries: hasMany('time-entry')
});
