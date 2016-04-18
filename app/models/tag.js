import DS from 'ember-data';
import Model from 'ember-pouch/model';

const { attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  timeEntries: hasMany('time-entry')
});
