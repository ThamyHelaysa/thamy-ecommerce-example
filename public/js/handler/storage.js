import categories from "../services/categories.js";
import products from "../services/products.js";

async function getCategorie(){
  try {
    const res = await categories.getCategories();
    return res;
  } catch(err){
    throw new Error(`Error getting categories: ${err}`);
  }
}

async function getProducts(id){
  try {
    const res = await products.getProducts(id);
    return res;
  } catch(err){
    throw new Error(`Error getting products: ${err}`);
  }
}

const dataAPI = {
  getCategorie,
  getProducts
}

export default dataAPI;