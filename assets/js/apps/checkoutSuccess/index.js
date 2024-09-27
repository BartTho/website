import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isSaturday from 'date-fns/isSaturday';
import isSunday from 'date-fns/isSunday';
import vOrderSummaryItem from '@components/orderSummaryItem/';
import vPromoCode from '@components/promoCode/';
import { productsById, skusById } from '@data/products';
import { formatPrice, taxRate } from '@data/shared';
import createVueApp from '@helpers/createVueApp';

const el = document.getElementById('vue-checkout-success');

const todaysDate = Date.now();

const data = {
  cart: {},
  customer: {},
  orderNumber: todaysDate,
  promo: {},
  taxRate,
};

const components = {
  vOrderSummaryItem,
  vPromoCode,
};

const computed = {
  deliveryDate() {
    const addBusinessDays = (date) => {
      if (isSaturday(date)) {
        return addDays(date, 2);
      }
      else if (isSunday(date)) {
        return addDays(date, 1);
      }

      return date;
    };

    const shippingCost = this.customer['shipping-cost'];
    let maxDaysToAdd = 7;
    let finalDate;

    if (shippingCost === 16) {
      maxDaysToAdd = 3
    }
    else if (shippingCost === 22) {
      maxDaysToAdd = 2;
    }

    finalDate = addDays(todaysDate, maxDaysToAdd);
    finalDate = addBusinessDays(finalDate);
    // Needs to be calculated again in case the first amendment fell on a weekend
    finalDate = addBusinessDays(finalDate);

    return format(finalDate, 'EEEE, MMMM dd, yyyy');
  },
  items() {
    return this.cart.items.map((item) => {
      const sku = skusById[item.id];
      const product = productsById[skusById[item.id].productId];

      return {
        ...item,
        descriptions: sku.type ? [sku.type] : sku.options.reduce((arr, key) => {
          arr.push(product.variants.options[key].name);

          return arr;
        }, []),
        name: product.name,
        price: sku.price || sku.options.reduce((total, key) => {
          return total += product.variants.options[key].price;
        }, 0),
        slug: product.slug,
      };
    });
  },
  orderTotal() {
    return formatPrice(this.totalAfterDiscountAndShipping + this.tax);
  },
  totalAfterDiscountAndShipping() {
    return this.cart.subTotal - this.totalDiscount + (this.customer['shipping-cost'] > -1 ? this.customer['shipping-cost'] : 0);
  },
  totalDiscount() {
    return this.cart.subTotal * (this.promo.discount / 100);
  },
  tax() {
    return this.totalAfterDiscountAndShipping * (this.taxRate / 100);
  },
};

const methods = {
  getProductFromSku(id) {
    return productsById[skusById[id].productId];
  },
  getSkuFromId(id) {
    return skusById[id];
  },
  formatPrice(num) {
    return formatPrice(num);
  },
};

const lifecycleHooks = {
  created() {
    const order = JSON.parse(sessionStorage.getItem('order')) || {};

    this.customer = { ...order };
    this.cart = { ...order.cart };
    this.promo = { ...order.promo };

    if (!this.cart.items) {
      location = '/shop/';
    }
    else {
      sessionStorage.removeItem('order');
    }
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, components, computed, methods, ...lifecycleHooks }));
