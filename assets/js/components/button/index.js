import { button as styles } from '@data/styles';

export default {
  styles,
  props: {
    as: {
      type: String,
    },
    href: {
      type: String,
    },
    group: {
      type: String,
    },
    target: {
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  computed: {
    elem() {
      return this.href ? 'a' : this.as || 'button';
    },
  },
  template: 'local',
};
