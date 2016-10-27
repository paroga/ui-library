import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';
import enableHandler from '../services/enablehandler.service.js';

export default class {
  static parameters() {
    return {
      items: {
        type: 'array'
      },
      defaultValue: {
        type: 'number'
      }
    };
  }

  static components() {
    return {
      subscribe,
      write,
      enableHandler
    };
  }

  static template() {
    return `<style>
        select{
            background-color: var(--input-bg, #f9f8f8);
            border: none;
            color: var(--input-color, #9c9c9c);
            padding-left: 5px;
            padding-right: 5px;
            width: 100%;
            height: 100%;
            /*custom arrow:*/
            background-image: linear-gradient(45deg, transparent 50%, var(--select-arrow-color, darkgrey) 50%),
                linear-gradient(135deg, var(--select-arrow-color, darkgrey) 50%, transparent 50%),
                linear-gradient(to right, var(--select-arrow-color, darkgrey), var(--select-arrow-color, darkgrey));
            background-position: calc(100% - 15px) calc(1em + 2px), calc(100% - 10px) calc(1em + 2px), calc(100% - 30px) 0px;
            background-size: 5px 5px, 5px 5px, 1px 100%;
            background-repeat: no-repeat;
            -webkit-appearance: none;
            -moz-appearance: none;
        }

        select.disabled {
            cursor: not-allowed;
        }
    </style>

    <select bind-value="value">
`;
  }

  createdCallback() {
    Object.assign(this.element, {
      getValue: () => this.getValue(),
      setValue: (value) => this.setValue(value)
    });
    let $ = this.$;

    if(typeof this.items !== 'undefined')
      this.setItems(this.items);

    if(typeof this.defaultValue !== 'undefined')
      this.setValue(this.defaultValue);

    $('select').on('change', () => {
      let value = parseFloat($('select').val()); //only numeric values suported atm
      this.setValue(value);
      this.write.writeValue(value);
    });

    this.subscribe.subscribe( (e) => { this.setValue(e.value);});

    this.enableHandler.toggleClasses([], ['disabled'], $('select'));
    this.enableHandler.toggleProperty('disabled', $('select'));
  }

  setItems(items) {
    for(let i in items){
      this.addItem(items[i].text, items[i].value);
    }
  }

  addItem(text, value){
    this.$('select')
      .append($('<option>', { value : value})
      .text(text));
  }

  setValue(value) {
    this.value = value;

    let valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
    this.element.dispatchEvent(valueChangedEvent);
  }

  getValue() {
    return Promise.resolve(this.value);
  }
}
