import sortHandler from "../handler/sort-handler.js";

export default class ListProducts extends HTMLElement {

  static get observedAttributes(){
    return ['data-sorted', 'data-filtered']
  }

  constructor(){
    super();

    this.category = JSON.parse(localStorage.category);
    this.products = JSON.parse(localStorage.products).items;

    // Get template tag
    this.tmplID = this.getAttribute("data-id");
    this.templateStyle = document.getElementById(this.tmplID);

    // Render ShadowDOM
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <div class="products">
        <ul class="products-list">
          
        </ul>
      </div>
    `

    shadowRoot.append(this.templateStyle.content.cloneNode(true));

  }

  async connectedCallback(){

    // Get categorie and find current
    // this.catList = await this.getCategoriesList();
    // this.catItem = this.catList.find((cat)=>{
    //   return cat.path == this.categorie
    // })
    this.catId = this.category.id;

    // Get categorie products of current categorie
    // this.catProductsData = await this.getCategorieProds(this.catId);
    // this.catFilters = this.catProductsData.filters;
    // this.products = this.catProductsData.items;

    NProgress.start();
    this.productsFormated = this.renderProducts(this.products);
    this.shadowRoot.children[0].children[0].innerHTML = this.productsFormated;
    NProgress.done();

  }

  /**
   * Get data list, transform to string 
   * and returns it to insert in shadowRoot
   * @param {Object} data Array of objects
   */
  renderProducts(data){
    var list = ""
    data.forEach((prod)=>{
      var prodSpecial = prod.specialPrice
      var item = `
        <li class="product-item">
          <div class="product-box">
            <div class="product-image">
              <img width="196" height="215" src="${prod.image}">
            </div>
            <div class="product-info">
              <div class="product-name"><span class="text">${prod.name}</span></div>
              <div class="price-box">
                <div class="${prodSpecial ? "old-" : ""}price">R$${prod.price}</div>
                ${ prodSpecial ? "<div class='special-price'>R$" + prodSpecial + "</div>" : ""}
              </div>
            </div>
            <div class="product-action">
              <button class="btn-action" type="button">Comprar</button>
            </div>
          </div>
        </li>
      `
      list += item
    })
    return list
  }

  /**
   * Method that takes key string
   * passing callback.
   * @param {String} val Key function
   * @returns Array sorted list
   */
  sortProducts(val){
    this.productsSort = this.products;
    this.productsSort.sort(sortHandler[val]);
    return this.productsSort
  }

  /**
   * Called when an observed attribute has been
   * added, removed, updated, or replaced.
   * @param {String} name Attribute name
   * @param {Any} oldValue Previous value
   * @param {any} newValue Current value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "data-sorted" && newValue){
      NProgress.start();
      const sorting = this.sortProducts(newValue);
      this.newSortingTemplate = this.renderProducts(sorting);
      this.shadowRoot.children[0].children[0].innerHTML = this.newSortingTemplate;
      NProgress.done();
    }
  }

}