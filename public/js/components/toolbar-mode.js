export default class ToolbarMode extends HTMLButtonElement {
  constructor(){
    super();

    // Fire event on click
    this.onclick = (ev) => {
      window.dispatchEvent(new CustomEvent("change:listing", {detail: {value: this.name}}));
    }

  }

}