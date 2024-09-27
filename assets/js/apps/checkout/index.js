import vOrderSummaryItem from '@components/orderSummaryItem/';
import vPromoCode from '@components/promoCode/';
import { productsById, skusById } from '@data/products';
import { formatPrice, taxRate } from '@data/shared';
import createVueApp from '@helpers/createVueApp';
import { clearCart, copyCartToSession, getCart } from '@utils/cart';

const el = document.getElementById('vue-checkout');

const validPromoCodes = {
  '5DISCOUNT': 5,
  '10DISCOUNT': 10,
  '15DISCOUNT': 15,
};

const defaultPromoState = {
  code: '',
  discount: 0,
  isValid: false,
  transientCode: '',
  validatedCode: '',
};

const data = {
  cart: {
    items: [],
    subTotal: 0,
  },
  customer: {
    'billing-address-first-name': '',
    'billing-address-last-name': '',
    'billing-address-address': '',
    'billing-address-apt-suite-optional': '',
    'billing-address-city': '',
    'billing-address-state': '',
    'billing-address-zip-code': '',
    'billing-address-phone': '',
    'billing-equals-shipping': false,
    'contact-information-email-address': '',
    'payment-method-card-number': '',
    'payment-method-name-on-card': '',
    'payment-method-expiration-month': '',
    'payment-method-expiration-year': '',
    'payment-method-security-code': '',
    'shipping-address-first-name': '',
    'shipping-address-last-name': '',
    'shipping-address-address': '',
    'shipping-address-apt-suite-optional': '',
    'shipping-address-city': '',
    'shipping-address-state': '',
    'shipping-address-zip-code': '',
    'shipping-address-phone': '',
    'shipping-cost': -1,
  },
  promo: { ...defaultPromoState },
  taxRate,
  validateForm: true,
};

const components = {
  vOrderSummaryItem,
  vPromoCode,
};

const computed = {
  freeShippingOptionHtml() {
    return this.qualifiesForFreeShipping ? '<b>Standard</b> | <del>$8.00</del> FREE <br />3 – 7 Business Days' : '<b>Standard</b> | $8.00<br />3 – 7 Business Days';
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
  qualifiesForFreeShipping() {
    return this.totalAfterDiscountAndShipping > 75;
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
  applyPromoCode() {
    this.validateForm = false;

    const code = this.promo.code.trim();
    const discount = validPromoCodes[this.promo.code] || 0;

    this.promo.transientCode = code;

    if (discount) {
      this.promo.discount = discount;
      this.promo.isValid = true;
      this.promo.validatedCode = code;
    }
    else {
      this.promo.isValid = false;
    }

    this.validateForm = true;
  },
  getProductFromSku(id) {
    return productsById[skusById[id].productId];
  },
  getSkuFromId(id) {
    return skusById[id];
  },
  handleBillingAddressToggle() {
    this.customer['billing-equals-shipping'] = !this.customer['billing-equals-shipping'];

    if (this.customer['billing-equals-shipping']) {
      Object.keys(this.customer)
        .filter((key) => key.startsWith('shipping-'))
        .forEach((key) => {
          this.customer[key.replace('shipping-', 'billing-')] = this.customer[key];
        });
    }
  },
  formatPrice(num) {
    return formatPrice(num);
  },
  removePromoCode() {
    this.promo = { ...defaultPromoState };
  },
  submitOrder() {
    const order = Object.keys(this.customer).reduce((obj, key) => {
      const value = this.customer[key];

      obj[key] = key.startsWith('payment-method-') && typeof value === 'string' ? value.slice(-4) : value;

      return obj;
    }, {});

    order.cart = getCart();
    order.orderTotal = this.orderTotal;
    order.promo = this.promo;
    order.totalDiscount = this.totalDiscount;
    order.tax = this.tax;

    sessionStorage.setItem('order', JSON.stringify(order));

    clearCart();
    location = '/checkout/success/';
  },
};

const lifecycleHooks = {
  created() {
    const cart = getCart();

    this.cart.items = cart.items;
    this.cart.subTotal = cart.subTotal;

    if (this.cart.items.length === 0) {
      location = '/cart/';
    }
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, components, computed, methods, ...lifecycleHooks }));
