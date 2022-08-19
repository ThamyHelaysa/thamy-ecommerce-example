export default class FilterSidebar extends HTMLElement {
  constructor(){
    super();

    const dataID = this.getAttribute("data-id");
    this.category = JSON.parse(localStorage.category);
    this.products = JSON.parse(localStorage.products).items;
    this.filters = JSON.parse(localStorage.products).filters;
    // this.filters = Object.keys(filterHandler);
    // console.log(this.filters);

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

    var filterValues = this.getFilterValue(this.products);
    var buttons = this.renderSwatchButtons(filterValues);

    const filtersTmpl = this.renderFilters(this.filters, buttons);
    this.shadowRoot.children[0].children[2].innerHTML = filtersTmpl;

  }

  renderFilters(data, btns){
    var list = "";
    data.forEach(cat => {
      var item = `
      <ul class="filter-content">
        <div class="filter-title">${cat.color}</div>
        ${btns}
      </ul>
      `
      list += item;
    });
    return list;
  }

  getFilterValue(data){
    // First: transform Object to Array
    var list = data.map(e => e.filter.map(x => Object.entries(x)[0]))

    // Last: reduces to concatenate the result
    var filters = list.reduce((a, o) => {
      o.forEach(([key, value]) => {
        a[key] = a[key] || new Set([]); a[key].add(value)
      });
      return a; 
    }, {});

    return filters
  }

  renderSwatchButtons(obj){
    var list = ""
    var objKey = Object.keys(obj)
    obj.color.forEach((el) => {
      var item = `
         <li class="filter-swatch">
           <button is="swatches-button" data-filter="${objKey[0]}:${el}">${el}</button>
         </li>
       `
       list += item
    })
    return list
  }

}