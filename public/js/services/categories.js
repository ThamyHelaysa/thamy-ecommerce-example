async function getCategories(){

  try {
    const res = await fetch(`/api/V1/categories/list`)
    if (res.ok){
      const data = await res.json();
      return data;
    }

  } catch(err){
    throw new Error(`Fail to get categories list: ${err}`);
  }

}

const categories = {
  getCategories
}

export default categories;