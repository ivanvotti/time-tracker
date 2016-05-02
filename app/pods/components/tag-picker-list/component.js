import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { get } = Ember;
const { setDiff, filter } = Ember.computed;

export default Ember.Component.extend({
  tags: null,
  selectedTags: null,
  inputValue: null,

  tagName: '',

  availableTags: setDiff('tags', 'selectedTags'),

  @computed('availableTags.@each.name', 'inputValue')
  filteredTags(tags, _inputValue) {
    if (_inputValue) {
      let inputValue = _inputValue.toLowerCase();

      return tags.filter((tag) => {
        return get(tag, 'name')
          .toLowerCase()
          .startsWith(inputValue);
      });
    }

    return tags;
  }
});
