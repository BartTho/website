import vQuantityChanger from '@components/quantityChanger/';
import { formatPrice } from '@data/shared';

export default {
  model: {
    prop: 'quantity',
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    index: {
      required: true,
      type: Number,
    },
    product: {
      required: true,
      type: Object,
    },
    quantity: {
      required: true,
      type: Number,
    },
    sku: {
      required: true,
      type: Object,
    },
  },
  components: {
    vQuantityChanger,
  },
  computed: {
    qty: {
      get() {
        return this.quantity;
      },
      set(qty) {
        this.$emit('input', qty);
        this.$emit('update_cart');
      },
    },
    descriptions() {
      return this.sku.type ? [this.sku.type] : this.sku.options.reduce((arr, key) => {
        arr.push(this.product.variants.options[key].name);

        return arr;
      }, []);
    },
    price() {
      return this.sku.price || this.sku.options.reduce((total, key) => {
        return total += this.product.variants.options[key].price;
      }, 0);
    },
  },
  methods: {
    formatPrice(num) {
      return formatPrice(num);
    },
  },
  template: 'local',
};
