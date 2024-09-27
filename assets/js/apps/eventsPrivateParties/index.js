import createVueApp from '@helpers/createVueApp';

const el = document.getElementById('vue-events-private-parties');

const data = {
  requiredServices: [],
};

const computed = {
  validateRequiredServices() {
    return this.requiredServices.length === 0;
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, computed }));
