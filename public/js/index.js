import NavCategories from "./components/navigation.js"
import SearchForm from "./components/search-form.js"
import FilterSidebar from "./components/filters.js";

// mock
const listMock = [
  {
    "id": 1,
    "name": "Camisetas",
    "path": "camisetas"
  },
  {
    "id": 2,
    "name": "Calças",
    "path": "calcas"
  },
  {
    "id": 3,
    "name": "Calçados",
    "path": "calcados"
  }
]

/**
 * Method to format and attach elements to
 * shadowDOM
 * @param {Array} list categories from API
 */
 function attachToShadowDom(list){
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
const formatedList = attachToShadowDom(listMock);
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


// Set template nav
// customElements.whenDefined("nav-categories").then(() => {
//   var newItems = attachToShadowDom(listMock);
//   document.querySelector("nav-categories").setAttribute("data-list", newItems);
//   console.log(document.querySelector("nav-categories"));
// });
