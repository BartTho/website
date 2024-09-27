import Vue from 'vue';

Vue.mixin({
  created() {
    this.states = {
      isDisabled: 'is-disabled',
      isExpanded: 'is-expanded',
      isHidden: 'is-hidden',
      isSelected: 'is-selected',
      isVisible: 'is-visible',
    };
  },
});
