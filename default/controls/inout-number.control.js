import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';
import enableHandler from '../services/enablehandler.service.js';
import formatHandler from '../services/formathandler.service.js';
import limitHandler from '../services/limithandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';

export default class {
  static parameters() {
    return {
      defaultValue: {
        type: 'number',
        default:0
      }
    };
  }

  static components() {
    return {
      subscribe,
      write,
      formatHandler,
      limitHandler,
      enableHandler,
      rangeHandler
    };
  }

  static template() {
    return `<style>
        input {
            background-color: var(--input-bg, #f9f8f8);
            border: none;
            color: var(--input-color, #9c9c9c);
            padding-left: 20px;
            padding-right: 20px;
            text-align: right;
            width: 100%;
            height: 100%;
        }

        input:focus {
            outline: none;
        }

        input.disabled {
            cursor: not-allowed;;
        }

        .-limit-low-low {
            border: 1px solid var(--low-low-color, rgb(236, 30, 83));
        }

        .-limit-low {
            border: 1px solid var(--low-color, rgb(254, 229, 128));
        }

        .-limit-high {
            border: 1px solid var(--high-color, rgb(254, 229, 128));
        }

        .-limit-high-high {
            border: 1px solid var(--high-high-color, rgb(236, 30, 83));
        }
    </style>
    <input type="number" bind-value="value|formatHandler.format" bind-min="rangeHandler.minimum" bind-max="rangeHandler.maximum" on-click="_selectInput">
`;
  }

  createdCallback() {
    Object.assign(this.element, {
      getValue: () => this.getValue(),
      setValue: (value) => this.setValue(value)
    });
    let $ = this.$;

    this._updateValue(this.defaultValue);

    $('input').on('change', () => {
      let value = parseFloat($('input').val());
      this.write.writeValue(value);
      this._updateValue(value);
    });

    this.subscribe.subscribe((e) => {this._updateValue(e.value);});

    this.enableHandler.toggleClasses([], ['disabled'], $('input'));
    this.enableHandler.toggleProperty('disabled', $('input'));

  }

  _selectInput() {
    this.$('input').select();
  }

  setValue(value) {
    if(typeof this.subscribe.base === 'undefined'){ //only apply if not bound to base variable
      this._updateValue(value);
    }
    else
      throw 'inout-led: setValue ignored, bound to variable: ' + this.subscribe.base;
  }

  _updateValue(value){
    if(typeof value === 'number'){
      this.value = value;

      this._handleLimits();

      let valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
      this.element.dispatchEvent(valueChangedEvent);
    }
    else
      throw 'inout-number: not supported type for setValue ' + typeof value;
  }

  getValue() {
    return Promise.resolve(this.value);
  }

  _handleLimits() {
    this.limitHandler.setLimitClass(this.$('input'), this.value);
  }

}
