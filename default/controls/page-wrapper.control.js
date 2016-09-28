import pageChanger from '../services/pagechanger.service.js';

export default class {
  static parameters() {
    return {
      name: { type: 'string' },
      defaultPage: { type: 'page' }
    };
  }

  static components() {
    return {
      pageChanger
    };
  }

  static template() {
    return '<style>#wrapper { width:100%; height:100%; }</style><div id="wrapper"></div>';
  }

  createdCallback() {
    if (typeof this.defaultPage === 'undefined')
      return;

    this.$('#wrapper').append(this.$('<wpc-use src="' + this.defaultPage + '"></wpc-use>'));

    this.pageChanger.listenToChange(this.name, (page) => {
      this.$('#wrapper').empty();
      this.$('#wrapper').append(this.$('<wpc-use src="' + page + '"></wpc-use>'));
    });
  }
}
