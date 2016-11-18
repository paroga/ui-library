import enableHandler from '../services/enablehandler.service.js';

export default class {
  static parameters() {
    return {
      label: {
        type: 'string',
        default: ''
      }
    };
  }

  static components() {
    return {
      enableHandler
    };
  }

  static template() {
    return `<div>{{label}}</div>`;
  }
}
