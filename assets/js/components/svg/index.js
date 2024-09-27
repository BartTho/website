import { svg as styles } from '@data/styles';
import html from '@helpers/html';

export default {
  styles,
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  template: html`
    <svg
      focusable="false"
      v-bind:class="styles.root"
    >
      <use v-bind:xlink:href="'#' + name" />
    </svg>
  `,
};
