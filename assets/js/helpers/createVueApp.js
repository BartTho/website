import Vue from 'vue';
import { createAppData, createAppTemplate, createComponentTemplates } from 'quench-vue';

const createApp = (el, defaultOpts) => {
  const opts = { ...defaultOpts };

  opts.el = el;

  opts.components = createComponentTemplates(opts.el, opts.components);
  opts.data = { ...opts.data, ...createAppData(opts.el) };
  opts.template = createAppTemplate(opts.el, opts.template);

  return new Vue(opts);
};

export default (el, defaultOpts = {}) => {
  return !el ? null : el.length > 1 ? Array.from(el).map((el) => createApp(el, defaultOpts)) : createApp(el, defaultOpts);
};
