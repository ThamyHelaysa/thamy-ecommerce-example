import NavCategories from "./components/navigation.js"
import SearchForm from "./components/search-form.js"
import FilterSidebar from "./components/filters.js";
import ListButton from "./components/list-button.js";

// Services
import products from "./services/products.js";

// mock
// const listMock = [
//   {
//     "id": 1,
//     "name": "Camisetas",
//     "path": "camisetas"
//   },
//   {
//     "id": 2,
//     "name": "Calças",
//     "path": "calcas"
//   },
//   {
//     "id": 3,
//     "name": "Calçados",
//     "path": "calcados"
//   }
// ]

/**
 * Method to format and attach elements to
 * shadowDOM
 * @param {Array} list categories from API
 */
 async function attachToShadowDom(){

  var list = ""
  try {
    const res = await products.getProducts
    list = res;
  } catch(err){
    throw new Error(`Fail get categories: ${err}`);
  }

  var templateItems = "";
  list.forEach(el => {
    var renderedItem = `
      <li class="item list-item categories-item">
        <a href="${el.path}">
          ${el.name}
        </a>
      </li>
    `
    templateItems += renderedItem
  })
  return templateItems;
}

function defineCustomElements(str, el, obj){
  return obj ? customElements.define(`${str}`, el, obj) : customElements.define(`${str}`, el);
}

function setDataList(el){
  document.querySelector(el).setAttribute("data-list", formatedList);
}

// Set attribute value for custom element handle
const formatedList = attachToShadowDom();
setDataList("nav-categories");
// document.querySelector("nav-categories").setAttribute("data-list", formatedList);

// Now declaring the element
// customElements.define("nav-categories", NavCategories);
defineCustomElements("nav-categories", NavCategories);

defineCustomElements("search-form", SearchForm, {extends: "form"});
// customElements.define("search-form", SearchForm, {extends: "form"});

// Sidebar
// Set sidebar extending NavCat
class ListSidebar extends NavCategories {
  constructor(){
    super();
  }
}
const sidebar = document.querySelector("list-sidebar");

function initListSidebar(){
  setDataList("list-sidebar");
  // document.querySelector("list-sidebar").setAttribute("data-list", formatedList);
  defineCustomElements("list-sidebar", ListSidebar)
  // customElements.define("list-sidebar", ListSidebar);
}

if (sidebar){
  initListSidebar();
}

// Filters
const filters = document.querySelector("filter-sidebar");

if(filters){
  defineCustomElements("filter-sidebar", FilterSidebar);
}

// List Button
const buttonList = document.querySelector("[is='list-button']");

if(buttonList){
  defineCustomElements("list-button", ListButton, {extends: "button"});
}

// Listen button event
window.addEventListener("change:listing", (detail) => {
  console.log(detail);
});


