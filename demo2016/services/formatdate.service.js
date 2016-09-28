export default class {
  static parameters() {
    return {
      'date-locales': {
        type: 'stringarray or string'
      },
      'date-options': {
        type: 'object'
      }
    };
  }

  getFormattedDate(date) {
    /**
     * see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
     * for more information about parameterization
     */
    return date.toLocaleTimeString(this['date-locales'], this['date-options']);
  }
}
