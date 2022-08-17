import categories from "../services/categories";
import products from "../services/products";

export default class ListProducts extends HTMLElement {
  constructor(){
    super()
  }

  connectedCallback(){

    this.getCategorieProds()
  }

  async getCategoriesList(){
    try {
      const res = await categories.getCategories();
      this.items = res
    } catch(err){
      throw new Error(`Error getting categories: ${err}`);
    }
  }

  async getCategorieProds(id){
    try {
      const res = await products.getProducts(2);
    } catch(err){
      throw new Error(`Error getting products: ${err}`);
    }
  }

}