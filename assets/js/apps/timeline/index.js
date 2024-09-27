import createVueApp from '@helpers/createVueApp';
import html from '@helpers/html';

const toRem = (num) => `${num / 16}rem`;

const el = document.getElementById('vue-timeline');

const data = {
  numberIcon1Position: 0,
  numberIcon8Position: 0,
};

const methods = {
  calculateMobile7to8Line() {
    const rect7 = this.$refs.timelineItem7.getBoundingClientRect();
    const rect8 = this.$refs.timelineItem8Feature.getBoundingClientRect();

    this.connect7To8LineMobile.setAttribute('style', `
      height: ${toRem(rect8.top - (rect7.top + rect7.height - 34))};
      left: ${toRem(82)};
      margin-top: ${toRem(-38)};
      top: 100%;
      width: ${toRem(4)};
    `);
  },
  calculateCalloutConnectorLines(mq) {
    if (mq.matches) {
      this.connect6ToPasteLine.setAttribute('style', `
        height: ${toRem(4)};
        margin-top: ${toRem(-2)};
        left: ${toRem(-48)};
        top: 50%;
        width: ${toRem(48)};
      `);

      this.connect6ToOilAndWaterLine.setAttribute('style', `
        bottom: 0;
        height: ${toRem(38)};
        left: 50%;
        margin-left: ${toRem(-2)};
        width: ${toRem(4)};
      `);

      this.connect7ToWaterLine.setAttribute('style', `
        height: ${toRem(4)};
        margin-top: ${toRem(-2)};
        left: ${toRem(-48)};
        top: 50%;
        width: ${toRem(48)};
      `);

      this.connect7To8LineDesktop.setAttribute('style', `
        bottom: ${toRem(-20)};
        height: ${toRem(58)};
        left: 50%;
        margin-left: ${toRem(-2)};
        width: ${toRem(4)};
      `);
    }
    else {
      this.connect6ToPasteLine.setAttribute('style', `
        height: ${toRem(38)};
        margin-left: ${toRem(-2)};
        left: 50%;
        top: ${toRem(-38)};
        width: ${toRem(4)};
      `);

      this.connect6ToOilAndWaterLine.setAttribute('style', `
        height: ${toRem(291)};
        left: ${toRem(82)};
        margin-top: ${toRem(-38)};
        width: ${toRem(4)};
        top: 100%;
      `);

      this.connect7ToWaterLine.setAttribute('style', `
        height: ${toRem(38)};
        margin-left: ${toRem(-2)};
        left: 50%;
        top: ${toRem(-38)};
        width: ${toRem(4)};
      `);

      this.connect7To8LineDesktop.setAttribute('style', `
        bottom: ${toRem(-274)};
        height: ${toRem(312)};
        left: 50%;
        margin-left: ${toRem(-2)};
        width: ${toRem(4)};
      `);
    }
  },
  calculateConnectorLines(mq) {
    if (mq.matches) {
      this.connect7ToOilAndWaterLine.setAttribute('style', `
        height: ${toRem(60)};
        left: 50%;
        margin-left: ${toRem(-2)};
        top: ${toRem(-64)};
        width: ${toRem(4)};
      `);

      this.connect7To8LineDesktop.setAttribute('style', `
        bottom: ${toRem(-274)};
        height: ${toRem(312)};
        left: 50%;
        margin-left: ${toRem(-2)};
        width: ${toRem(4)};
      `);
    }
    else {
      this.connect7ToOilAndWaterLine.setAttribute('style', `
        height: ${toRem(60)};
        left: ${toRem(82)};
        top: ${toRem(-64)};
        width: ${toRem(4)};
      `);

      this.connect7To8LineDesktop.setAttribute('style', `
        bottom: ${toRem(-20)};
        height: ${toRem(58)};
        left: 50%;
        margin-left: ${toRem(-2)};
        width: ${toRem(4)};
      `);
    }
  },
  calculateNumberIconLines() {
    const firstRect = this.$refs.numberIcon1.getBoundingClientRect();
    const lastRect = (this.$refs.numberIcon8Standard || this.$refs.numberIcon8Feature).getBoundingClientRect();

    this.numberIcon1Position = firstRect.y + window.scrollY;
    this.numberIcon8Position = lastRect.y + window.scrollY + lastRect.height;

    this.numberIconLine.setAttribute('style', `
      left: ${firstRect.x + (firstRect.width / 2) - 4}px;
      height: ${this.numberIcon8Position - this.numberIcon1Position}px;
      top: ${this.numberIcon1Position}px;
      width: ${toRem(8)};
    `);

    this.numberIconLine1.setAttribute('style', `
      left: ${toRem(-50)};
      height: ${toRem(410)};
      top: ${toRem(40)};
      width: ${toRem(8)};
    `);

    this.numberIconLine2.setAttribute('style', `
      left: ${toRem(-50)};
      height: ${toRem(640)};
      top: ${toRem(-160)};
      width: ${toRem(8)};
    `);
  },
  setupConnectors() {
    this.connect6ToPasteLine = document.createElement('div');
    this.connect6ToOilAndWaterLine = document.createElement('div');
    this.connect7ToOilAndWaterLine = document.createElement('div');
    this.connect7ToWaterLine = document.createElement('div');
    this.connect7To8LineMobile = document.createElement('div');
    this.connect7To8LineDesktop = document.createElement('div');

    const lineClassNameBlue = `
      background-color:blue-2c3d57
      position:absolute
    `;

    const lineClassNameGreen = `
      background-color:green-459482
      position:absolute
    `;

    this.connect6ToPasteLine.setAttribute('class', lineClassNameBlue);
    this.connect6ToOilAndWaterLine.setAttribute('class', lineClassNameBlue);
    this.connect7ToOilAndWaterLine.setAttribute('class', lineClassNameBlue);
    this.connect7ToWaterLine.setAttribute('class', lineClassNameGreen);
    this.connect7To8LineMobile.setAttribute('class', `
      ${lineClassNameGreen}
      z-index:100
      @mq-768--display:none
    `);
    this.connect7To8LineDesktop.setAttribute('class', `
      ${lineClassNameGreen}
      @mq-upto-768--display:none
    `);

    const arrow7ToWater = document.createElement('div');
    const arrow7To8Mobile = document.createElement('div');
    const arrow7To8Desktop = document.createElement('div');

    const arrowClassName = (borderTopColor) => `
      border-style:solid
      border-color:transparent
      ${borderTopColor}
      position:absolute
    `;

    arrow7ToWater.setAttribute('class', arrowClassName('border-top-color:blue-2c3d57'));
    arrow7To8Mobile.setAttribute('class', arrowClassName('border-top-color:green-459482'));
    arrow7To8Desktop.setAttribute('class', arrowClassName('border-top-color:green-459482'));

    const arrowStyles = `
      border-width: ${toRem(24)} ${toRem(12)} 0 ${toRem(12)};
      bottom: ${toRem(-4)};
      left: ${toRem(-10)};
    `;

    arrow7ToWater.setAttribute('style', arrowStyles);
    arrow7To8Mobile.setAttribute('style', arrowStyles);
    arrow7To8Desktop.setAttribute('style', arrowStyles);

    this.connect7ToOilAndWaterLine.prepend(arrow7ToWater);
    this.connect7To8LineMobile.prepend(arrow7To8Mobile);
    this.connect7To8LineDesktop.prepend(arrow7To8Desktop);

    this.$refs.timelineItemCalloutCircle6.prepend(this.connect6ToPasteLine);
    this.$refs.timelineItem6.prepend(this.connect6ToOilAndWaterLine);
    this.$refs.timelineItem7.prepend(this.connect7ToOilAndWaterLine);
    this.$refs.timelineItemCalloutCircle7.prepend(this.connect7ToWaterLine);
    this.$refs.timelineItem7.prepend(this.connect7To8LineMobile);
    this.$refs.timelineItem7.prepend(this.connect7To8LineDesktop);

    const mq768 = window.matchMedia(`(min-width: ${768 / 16}em)`);
    const mq1100 = window.matchMedia(`(min-width: ${1100 / 16}em)`);

    this.calculateConnectorLines(mq768);
    this.calculateCalloutConnectorLines(mq1100);
    this.calculateMobile7to8Line();

    mq768.addListener(this.calculateConnectorLines);
    mq1100.addListener(this.calculateCalloutConnectorLines);
    window.addEventListener('resize', this.calculateMobile7to8Line);
  },
  setupNumberLines() {
    this.numberIconLine = document.createElement('div');
    this.numberIconLine1 = document.createElement('div');
    this.numberIconLine2 = document.createElement('div');

    const className = `
      background-color:green-85c2b6
      position:absolute
      @mq-upto-768--display:none
    `;

    this.numberIconLine.setAttribute('class', className);
    this.numberIconLine1.setAttribute('class', className);
    this.numberIconLine2.setAttribute('class', className);

    this.$el.prepend(this.numberIconLine);
    this.$refs.numberIcon1.parentElement.prepend(this.numberIconLine1);
    this.$refs.numberIcon2.parentElement.prepend(this.numberIconLine2);

    this.calculateNumberIconLines();

    window.addEventListener('resize', this.calculateNumberIconLines);
  },
};

const lifecycleHooks = {
  mounted() {
    this.setupNumberLines();
    this.setupConnectors();
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, methods, ...lifecycleHooks }));
