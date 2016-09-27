import enableHandler from '../services/enablehandler.service.js';

export default class {
  static parameters() {
    return {
      label: {
        type: 'string'
      }
    };
  }

  static components() {
    return {
      enableHandler
    }
  }

  static template() {
    return `
<style>
  button {
    background-color: var(--input-bg);
    border: none;
    border-radius: var(--input-border-radius);
    color: var(--input-color);
    height: 100%;
    width: 100%;
  }

  button:hover {
    border: none;
    box-shadow: 0px 0px 21px 0px rgba(138,138,138,1);
  }

  button:focus {
    outline: none;
  }

  button.disabled:hover {
    box-shadow: none;
  }

  button.disabled {
    cursor: not-allowed;;
  }
</style>
<button on-click="clicked">{{label}}</button>
`;
  }

  createdCallback() {
    this.enableHandler.addClassIfDisabled(this.$('button'), 'disabled');
  }

  _fireClickedTrigger(value) {
    var buttonClickedEvent = new CustomEvent('clicked');

    if (value)
      buttonClickedEvent = new CustomEvent('clicked', {detail: value});

    this.element.dispatchEvent(buttonClickedEvent);
  }

  clicked() {
    this.enableHandler.callIfEnabled(this._fireClickedTrigger.bind(this));
  }
}
