export default class Swatches extends HTMLInputElement {

  constructor(){
    super();

    this.filterVal = this.getAttribute("data-filter");

    this.onchange = () => {
      console.log(this.filterVal);
      window.dispatchEvent(new CustomEvent("swatch:selected", {detail:{value: this.filterVal}}))
    };

  }

}