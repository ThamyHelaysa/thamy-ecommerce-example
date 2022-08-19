export default class Swatches extends HTMLButtonElement {

  constructor(){
    super();

    this.filterVal = this.getAttribute("data-filter");

    this.onclick = () => {
      window.dispatchEvent(new CustomEvent("swatch:selected", {detail:{value: this.filterVal}}))
    };

  }

}