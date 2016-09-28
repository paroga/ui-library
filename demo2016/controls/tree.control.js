export default class {
  static parameters() {
    return {
      testparam: {
        type: 'string'
      }
    }
  }

  static template() {
    return '<div class="tree-wrapper">tree {{testparam}}</div>';
  }

  createdCallback() {
    console.log('ASDF: ', this.testparam);
    console.log(this.$('.tree-wrapper'));
    Object.assign(this.element, {
      show: () => this.show(),
      hide: () => this.hide()
    });
  }

  show() {
    this.$('.tree-wrapper').fadeIn();
  }

  hide() {
    this.$('.tree-wrapper').fadeOut();
  }
}
