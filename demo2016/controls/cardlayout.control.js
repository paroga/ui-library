export default class {
  static parameters() {
    return {
      label: { type: 'string' }
    };
  }

  static template() {
    return `
<style>
#cardlayout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
<div id="cardlayout">
  <slot name="default">empty</slot>
</div>
`;
  }
}
