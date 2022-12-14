/**
 * Import Custom Elements
 */
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
 * Dispatch event
 */
function dispatchStorageEvent(){
  window.dispatchEvent(new CustomEvent("localstorage:loaded", {detail: "ok"}));
}

/**
 * Sets localStorage based on previous data
 */
if (currentCategory && (!localData || currentCategory != localData.name)){
  localData = null;
  setStorage();
} else {
  setTimeout(()=>{
    dispatchStorageEvent();
  }, 1500)
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

  dispatchStorageEvent();
  //window.dispatchEvent(new CustomEvent("localstorage:loaded", {detail: "ok"}));
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
  window.addEventListener("localstorage:loaded", ()=>{
    return obj ? customElements.define(`${str}`, el, obj) : customElements.define(`${str}`, el);
  })
}

/**
 * Defining:
 * Custom nav and search Elements
 */
defineCustomElements("search-form", SearchForm, {extends: "form"});

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

