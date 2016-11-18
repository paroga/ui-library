import subscribe from '../../default/services/subscribe.service.js';

export default class {
  static parameters() {
    return {
      base: { type: 'address' },
      activeImage: { type: 'address' },
      inactiveImage: { type: 'address' },
    };
  }

  static components() {
    return {
      subscribe
    };
  }

  static template() {
    return '<style>#image { width:var(--switch-image-width, 150px); \
            height:var(--switch-image-height, 150px); background-repeat: \
            no-repeat; background-size: contain; background-position: center;} \
            </style><div id="image"></div>';
  }

  createdCallback() {
    if(typeof this.activeImage === 'undefined' &&
      typeof this.inactiveimage === 'undefined' &&
      typeof this.subscribe.base === 'undefined')
        return;

    this.updateValue();
    this.subscribe.onchange = (e) => {
        this.updateValue(e.value);
    };
  }

  updateValue(value) {
    let url = value ? this.activeImage : this.inactiveImage;
    this.$('#image').css('background-image', `url(${url.replace(':', '/').join('/')})`);
  }
}
