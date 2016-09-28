import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';
import enableHandler from '../services/enablehandler.service.js';
import limitHandler from '../services/limithandler.service.js';
import formatHandler from '../services/formathandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';

export default class {
	static parameters() {
		return {
			default: {
				type: 'number'
			}
		};
	}

	static components() {
		return {
            subscribe,
            write,
			enableHandler,
			limitHandler,
			formatHandler,
			rangeHandler
		}
	}


	static template() {
	return `
<style>

.wrapper {
	font-family: var(--default-font-family);
}

.value-wrapper {
	font-size: 0.9em;
	padding-bottom: 5px;
}

.label-wrapper {
	color: var(--input-label-color);
	font-size: 0.6em;
	margin-top: 3px;
}

.output-value {
	margin-left: var(--slider-thumb-size);
	white-space: nowrap;
}

.label-max {
	float:right;
}

input[type=range] {
    /*removes default webkit styles */
    -webkit-appearance: none;

    background: var(--input-inactive-bg);
    border-radius: 15px;
    cursor: pointer;
		margin: 0;
    width: 100%;
		position: relative;
		z-index: 2;
		height: 11px;
}

input[type=range].limits {
	background: linear-gradient(to right, var(--low-low-color) 0%, var(--low-color) var(--lowlow), var(--slider-active-bg) var(--low), var(--slider-active-bg) var(--high), var(--high-color) var(--highhigh), var(--high-high-color) 100%);
}

input[type=range].normal {
	background: linear-gradient(to right, var(--slider-active-bg) 0%, var(--slider-active-bg) var(--percent), var(--input-inactive-bg) var(--percent), var(	--input-inactive-bg) 100%);
}

input[type=range].disabled {
	background: var(--input-disabled-bg);
	cursor: not-allowed;
}

input[type=range]::-webkit-slider-thumb {
	-webkit-appearance: none;
	border: var(--slider-thumb-border) solid var(--slider-thumb-bordercolor);
	border-radius: 50%;
	box-shadow: 0px 2px 5px var(--slider-thumb-shadowcolor);
	height: var(--slider-thumb-size);
	margin-top: -6px;
	width: var(--slider-thumb-size);
}

.thumb-enabled::-webkit-slider-thumb {
    background: var(--slider-thumb-color);
}

.thumb-disabled::-webkit-slider-thumb {
    background: var(--input-disabled-bg);
		cursor: not-allowed;
}

.thumb-limits::-webkit-slider-thumb {
    background: var(--slider-thumb-limits-color);
}

input[type='range']::-webkit-slider-runnable-track {
    border: none;
    border-radius: 15px;
		box-shadow: inset 0px 5px 10px -1px var(--input-shadow-color);
    height: 10px;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}
</style>
<div class="wrapper">
	<div class="value-wrapper">
		<span class="output-value">{{value|formatHandler.format}}</span>
	</div>
	<input type="range" bind-min="rangeHandler.minimum" bind-max="rangeHandler.maximum" bind-value="value" on-input="_onInput"></input>
	<div class="label-wrapper">
		<span class="label label-min">{{rangeHandler.minimum}}</span>
		<span class="label label-max">{{rangeHandler.maximum}}</span>
	</div>
</div>
`;
	}

	createdCallback() {
		Object.assign(this.element, {
			getValue: () => this.getValue(),
			setValue: (value) => this.setValue(value)
		});

		let $ = this.$;

		let myProperties = ['lowlow', 'low', 'high', 'highhigh'];
		for (let name of myProperties)
			$('input')[0].style.setProperty(`--${name}`, `${this.limitHandler[name]}%`);

		this.sliderThumbSize = parseInt($('.output-value').css('margin-left'), 10);

		this.enableHandler.toggleClasses(['thumb-enabled'], ['thumb-disabled'], $('input'));
		this.enableHandler.toggleProperty('disabled', $('input'))

		this.setValue(this.default);

        this.subscribe.onchange = (e) => {
            this.setValue(e.value);
        };
	}

	getValue() {
		return Promise.resolve(this.value);
	}

	_onInput() {
        //TODO: these should only be executed when input is done (mouseUp)
		this.setValue(parseFloat(this.$('input').val()));
        this.write.writeValue(this.value);
	}

	setValue(value) {
		let $ = this.$;

		if (typeof value === 'string' && !isNaN(value)) //coming from trigger setValue
			this.value = value;
		else if (typeof value === 'number')
			this.value = value;
		//else
			//throw 'typeError';

		let relativeValue = this.rangeHandler.getRelativeValue(value);
		$('input')[0].style.setProperty('--percent', relativeValue*100 + '%');

		$('.output-value').css('margin-left', relativeValue * ($('.wrapper').width() - this.sliderThumbSize) + this.sliderThumbSize/2 - $('.output-value').width()/2);

		if (!this.enableHandler.isEnabled()) {
			return;
		} else if (this.limitHandler.lowlow) {
			$('input').attr('class', 'limits thumb-limits');
		} else {
			$('input').attr('class', 'normal thumb-enabled');
		}

		var valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
		this.element.dispatchEvent(valueChangedEvent);
	}
}
