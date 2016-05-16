import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
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

    get(this, 'durationCountingTask').perform();
  },

  resetDuration() {
    let startedAt = get(this, 'timeEntry.startedAt');
    let duration = 0;

    if (startedAt) {
      duration = moment().diff(startedAt, 'seconds');
    }

    set(this, 'duration', duration);
  },

  durationCountingTask: task(function* () {
    this.resetDuration();

    while (true) {
      yield timeout(1000);
      this.incrementProperty('duration');
    }
  }).restartable()
});
