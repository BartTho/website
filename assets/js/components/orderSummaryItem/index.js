import { formatPrice } from '@data/shared';

export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatPrice(num) {
      return formatPrice(num);
    },
  },
  template: 'local',
};
