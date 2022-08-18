import NavCategories from "./components/navigation.js"
import SearchForm from "./components/search-form.js"
import FilterSidebar from "./components/filters.js";
import ListButton from "./components/list-button.js";
import ListProducts from "./components/list-products.js";

// Services
import categories from "./services/categories.js";

/**
 * Async function that returns categories items
 * from categories service
 * @returns List Items
 */
async function getCategoriesItems(){
  var list = ""
  try {
    const res = await categories.getCategories();
    list = res.items;
  } catch(err){
    throw new Error(`Fail get categories: ${err}`);
  }
  return list
}

/**
 * Async function that gets categories items
 * and transform the data to set to the shadowDOM
 * @returns Template Items
 */
async function attachToShadowDom(){

  var list = await getCategoriesItems();

  var templateItems = "";
  list.forEach(el => {
    var renderedItem = `
      <li class="item list-item categories-item">
        <a href="/${el.path}">
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
const formatedList = await attachToShadowDom();
setDataList("nav-categories");

// Now declaring the element
defineCustomElements("nav-categories", NavCategories);

defineCustomElements("search-form", SearchForm, {extends: "form"});

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
  defineCustomElements("list-sidebar", ListSidebar);
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
window.addEventListener("change:listing", ({detail}) => {
  var previousData = document.querySelector("list-products").getAttribute("class");
  document.querySelector(".products-listing").classList.replace(previousData, detail.value);
  document.querySelector("list-products").classList.replace(previousData, detail.value);
});

// Categorie Products
const listProducts = document.querySelector("list-products");
if (listProducts){
  defineCustomElements("list-products", ListProducts);
}
