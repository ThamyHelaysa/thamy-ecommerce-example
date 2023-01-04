async function getProducts(id){

  try {
    const res = await fetch(`/api/V1/categories/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    })
    if(res.ok){
      const data = await res.json();
      return data;
    }
  } catch(err){
    throw new Error(`Error getting categorie products: ${err}`);
  }

}

const products = {
  getProducts
}

export default products;