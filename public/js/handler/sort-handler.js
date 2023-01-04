const sortProducts = {
  "Maior preço": (a,b) => {
    return b.specialPrice? b.specialPrice - a.price : b.price - a.price;
  },
  "Menor preço": (a,b) => {
    return a.specialPrice? a.specialPrice - b.price : a.price - b.price;
  },
  "A-Z": (a,b) => {
    return b.name > a.name ? 1 : -1;
  },
  "Z-A": (a,b) => {
    return a.name > b.name ? 1 : -1;
  },
}

export default sortProducts;