/**
 * Import Custom Elements
 */
import NavCategories from "./components/navigation.js"
import SearchForm from "./components/search-form.js"
import FilterSidebar from "./components/filters.js";
import ToolbarMode from "./components/toolbar-mode.js";
import ListProducts from "./components/list-products.js";
import ToolbarSorter from "./components/toolbar-sorter.js";
import Swatches from "./components/filters-swatches.js";

/**
 * Import services
 */
import dataAPI from "./handler/storage.js";

/**
 * Gets category and sets to localStorage
 */
const currentCategory = document.querySelector("meta[name='category']")?.getAttribute("content");
var localData = localStorage.category && JSON.parse(localStorage.category);

/**
 * Sets localStorage based on previous data
 */
if (currentCategory && (!localData || currentCategory != localData.name)){
  localData = null;
  setStorage();
} else {
  window.dispatchEvent(new CustomEvent("localstorage:loaded", {detail: "ok"}));
}

/**
 * @description Sets data to localStorage
 */
async function setStorage(){
  const catList = await dataAPI.getCategorie();
  const catDATA = catList.items.find((cat)=>{
    return cat.name == currentCategory
  });
  const catProducts = await dataAPI.getProducts(catDATA.id);

  localStorage.setItem("categories", JSON.stringify(catList));
  localStorage.setItem("category", JSON.stringify(catDATA));
  localStorage.setItem("products", JSON.stringify(catProducts));

  window.dispatchEvent(new CustomEvent("localstorage:loaded", {detail: "ok"}));
}

/**
 * Gets categories items
 * and transform the data to string
 * for set element shadowDOM
 * @returns Template Items
 */
function attachToShadowDom(){

  var list = JSON.parse(localStorage.categories).items;
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


/**
 * Define custom constructor
 * @param {String} str Element tag name
 * @param {CustomElementConstructor} el Element
 * @param {ElementDefinitionOptions | undefined} obj Element HTML type
 * @returns Define function
 */
function defineCustomElements(str, el, obj){
  // Define elements after localStorage
  if(!localData){
    window.addEventListener("localstorage:loaded", ()=>{
      return obj ? customElements.define(`${str}`, el, obj) : customElements.define(`${str}`, el);
    })
  } else {
    return obj ? customElements.define(`${str}`, el, obj) : customElements.define(`${str}`, el);
  }
}


var formatedList = {}
if (!localData){
  // Define elements after localStorage
  window.addEventListener("localstorage:loaded", ()=>{
    // Set attribute value for custom element handle
    formatedList = attachToShadowDom();
    setDataList("nav-categories");
  })
} else {
  formatedList = attachToShadowDom();
  setDataList("nav-categories");
}

/**
 * Sets custom attribute to passed
 * element
 * @param {any} el Element selector
 */
function setDataList(el){
  document.querySelector(el).setAttribute("data-list", formatedList);
}

/**
 * Defining:
 * Custom nav and search Elements
 */
defineCustomElements("nav-categories", NavCategories);
defineCustomElements("search-form", SearchForm, {extends: "form"});

/**
 * Sidebar
 * Set sidebar extending NavCategories
 */
class ListSidebar extends NavCategories {
  constructor(){
    super();
  }
}
const sidebar = document.querySelector("list-sidebar");

/**
 * Custom define handler for sidebar
 * new navigation
 */
function initListSidebar(){
  setDataList("list-sidebar");
  defineCustomElements("list-sidebar", ListSidebar);
}

if (sidebar){
  initListSidebar();
}

/**
 * Filters
 */
const filters = document.querySelector("filter-sidebar");

if(filters){
  defineCustomElements("filter-sidebar", FilterSidebar);
  defineCustomElements("swatches-button", Swatches, {extends: "input"});
}

/**
 * Toolbar Mode Button
 */
const buttonList = document.querySelector("[is='toolbar-mode']");

if(buttonList){
  defineCustomElements("toolbar-mode", ToolbarMode, {extends: "button"});
}

/**
 * Toobar Mode Button CustomEvent
 */
window.addEventListener("change:listing", ({detail}) => {
  var previousData = document.querySelector("list-products").getAttribute("class");
  document.querySelector(".products-listing").classList.replace(previousData, detail.value);
  document.querySelector("list-products").classList.replace(previousData, detail.value);
});

/**
 * Toolbar Sorter Element
 */
var toolbarSorter = document.querySelector("toolbar-sorter")
if (toolbarSorter){
  defineCustomElements("toolbar-sorter", ToolbarSorter);
}

/**
 * Sets attribute to list-product element
 * 
 * @param {String} attr Custom element Tag
 * @param {any} val Custom element Tag value
 */
var setDataListProducts = (attr, val) => {
  document.querySelector("list-products").setAttribute(attr, val);
}

window.addEventListener("sort:list", ({detail}) => {
  setDataListProducts("data-sorted", detail.value)
})

window.addEventListener("swatch:selected", ({detail})=>{
  console.log(detail)
  setDataListProducts("data-filtered", detail.value)
})

/**
 * Products List Custom Element
 */
const listProducts = document.querySelector("list-products");
if (listProducts){
  defineCustomElements("list-products", ListProducts);
}
