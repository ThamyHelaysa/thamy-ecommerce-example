import categories from "../services/categories.js";
import products from "../services/products.js";

export default class ListProducts extends HTMLElement {
  constructor(){
    super();

    this.categorie = this.getAttribute("name");
    this.tmplID = this.getAttribute("data-id");
    this.templateStyle = document.getElementById(this.tmplID);

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
    this.catList = await this.getCategoriesList();
    this.catItem = this.catList.find((cat)=>{
      return cat.path == this.categorie
    })
    this.catId = this.catItem.id;

    // Get categorie products of current categorie
    this.products = await this.getCategorieProds(this.catId);
    console.table(this.products);
    // debugger;

    this.productsFormated = ""
    this.products.forEach((prod)=>{
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
      this.productsFormated += item
    })

    this.shadowRoot.children[0].children[0].innerHTML = this.productsFormated;

  }

  /**
   * Fetch categorie data with path, name 
   * and id
   * @returns Array of items
   */
  async getCategoriesList(){
    try {
      const res = await categories.getCategories(this.catId);
      return res.items;
    } catch(err){
      throw new Error(`Error getting categories: ${err}`);
    }
  }

  /**
   * Fetch categorie products
   * @param {Number} id categorie id
   * @returns Array of items
   */
  async getCategorieProds(id){
    try {
      const res = await products.getProducts(id);
      return res.items;
    } catch(err){
      throw new Error(`Error getting products: ${err}`);
    }
  }

}