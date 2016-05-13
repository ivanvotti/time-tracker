import Component from 'ember-component';
import computed from 'ember-computed-decorators';
import moment from 'moment';
import { task, timeout } from 'ember-concurrency';
import formatDuration from 'time-tracker/utils/format-duration';

export default Component.extend({
  classNames: ['c-entry', 'c-entry--active'],
  timeEntry: null,
  duration: 0,

  @computed('duration')
  durationDisplay(duration) {
    return formatDuration(duration);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('durationCountingTask').perform();
  },

  resetDuration() {
    let startedAt = this.get('timeEntry.startedAt');
    let duration = 0;

    if (startedAt) {
      duration = moment().diff(startedAt, 'seconds');
    }

    this.set('duration', duration);
  },

  durationCountingTask: task(function* () {
    this.resetDuration();

    while (true) {
      yield timeout(1000);
      this.incrementProperty('duration');
    }
  }).restartable()
});
