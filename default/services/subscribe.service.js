export default class {
  static parameters() {
    return {
      base: {
        type: 'address'
      }
    };
  }

  createdCallback() {
    if (!this.base)
      return;
    this.wpcp.subscribeData([{id:this.base}], e => {
      if (typeof this.onchange === "function")
        this.onchange(e);
    }, (ids, infos) => {
      if (!ids[0])
        console.error(`Can not subscrbe ${JSON.stringify(this.base)}:`, infos[0]);
    });
  }
}
