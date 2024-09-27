import vSvg from '@components/svg/';
import { iconButton as styles } from '@data/styles';

export default {
  components: {
    vSvg,
  },
  styles,
  props: {
    as: {
      type: String,
    },
    badge: {
      type: [Number, String],
    },
    badgeAlt: {
      type: [Number, String],
    },
    href: {
      type: String,
    },
    iconClassName: {
      type: String,
    },
    iconName: {
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
