import Component from 'ember-component';
import { setDiff, sort } from 'ember-computed';
import computed, { on } from 'ember-computed-decorators';
import { EKMixin, keyUp } from 'ember-keyboard';

export default Component.extend(EKMixin, {
  classNames: ['c-tag-picker__list'],
  allTags: null,
  selectedTags: null,
  inputValue: null,
  tagsSorting: ['name'],

  availableTags: setDiff('allTags', 'selectedTags'),
  sortedFilteredTags: sort('filteredAvailableTags', 'tagsSorting'),

  @computed('inputValue', 'availableTags.@each.name')
  filteredAvailableTags(inputValue, availableTags) {
    if (inputValue) {
      let upperInputValue = inputValue.toUpperCase();

      return availableTags.filter((tag) => (
        tag.get('name').toUpperCase().startsWith(upperInputValue)
      ));
    }

    return availableTags;
  },

  @computed('inputValue', 'allTags.[]', 'selectedTags.[]')
  canCreateTag(inputValue, allTags, selectedTags) {
    if (!inputValue) {
      return false;
    }

    let upperInputValue = inputValue.toUpperCase();
    let isTagNameUniqueInAll = !allTags.any((tag) => (
      tag.get('name').toUpperCase() === upperInputValue
    ));
    let isTagNameUniqueInSelected = !selectedTags.any((tag) => (
      tag.get('name').toUpperCase() === upperInputValue
    ));

    return isTagNameUniqueInAll && isTagNameUniqueInSelected;
  },

  didRender() {
    this._super(...arguments);
    this.resetActiveItem();
  },

  didInsertElement() {
    this._super(...arguments);
    this.activateKeyboard();
  },

  activateKeyboard() {
    this.setProperties({
      keyboardActivated: true,
      keyboardFirstResponder: true
    });
  },

  resetActiveItem() {
    let $items = this.$('.js-tag-picker-list-item');
    $items.removeClass('is-active');

    if (this.get('inputValue')) {
      $items.first().addClass('is-active');
    }
  },

  @on(keyUp('ArrowUp'))
  onArrowUp() {
    let $selectedItem = this.$('.is-active');
    let $newSelectedItem = $selectedItem.prev();

    if ($newSelectedItem.length) {
      $selectedItem.removeClass('is-active');
      $newSelectedItem
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    }
  },

  @on(keyUp('ArrowDown'))
  onArrowDown() {
    let $selectedItem = this.$('.is-active');
    let $newSelectedItem = $selectedItem.next();

    if ($newSelectedItem.length) {
      $selectedItem.removeClass('is-active');
      $newSelectedItem
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    } else if (!$selectedItem.length) {
      this.$('.js-tag-picker-list-item')
        .first()
        .addClass('is-active');
    }
  },

  @on(keyUp('Enter'))
  onEnter() {
    let $selectedItem = this.$('.is-active');

    if ($selectedItem.length) {
      $selectedItem.click();
      this.get('element').scrollTop = 0;
    } else if (!this.get('inputValue')) {
      this.attrs.emptyEnter();
    }
  },

  @on(keyUp('Escape'))
  onEscape() {
    this.get('close')();
  }
});
