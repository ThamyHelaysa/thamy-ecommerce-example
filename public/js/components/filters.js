import products from "../services/products.js";
import filterHandler from "../handler/filter-handler.js";

export default class FilterSidebar extends HTMLElement {
  constructor(){
    super();

    const dataID = this.getAttribute("data-id");
    this.category = JSON.parse(localStorage.category);
    this.products = JSON.parse(localStorage.products).items;
    this.filters = this.sorts = Object.keys(filterHandler);
    console.log(this.filters);

    // Get data template
    const dataTemplate = document.getElementById(dataID);

    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <div class="filters">
        <div class="title">
          <h3>Filtre Por</h3>
        </div>
        <div class="filtered">
        </div>
        <div class="filters-list list">
        </div>
      </div>
    `

    shadowRoot.append(dataTemplate.content.cloneNode(true));

  }

  async connectedCallback(){

    const filtersTmpl = this.renderFilters(this.filters);
    this.shadowRoot.children[0].children[2].innerHTML = filtersTmpl;
    
  }

  renderFilters(data){
    var list = "";
    data.forEach(cat => {
      var item = `
      <ol class="filter-content">
        <div class="filter-title">${cat}</div>
        <button is="swatches-button" data-filter=""></button>
      </ol>
      `
      list += item;
    });
    return list;
  }

}