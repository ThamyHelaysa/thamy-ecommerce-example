import NavCategories from './components/navigation.js'
import SearchForm from './components/search-form.js'

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

// Set attribute value for custom element handle
const formatedList = attachToShadowDom(listMock);
document.querySelector("nav-categories").setAttribute('data-list', formatedList);

// Now declaring the element
customElements.define('nav-categories', NavCategories);

customElements.define('search-form', SearchForm, {extends: 'form'});

// Set sidebar extending NavCat
class ListSidebar extends NavCategories {
  constructor(){
    super();
  }
}

document.querySelector("list-sidebar").setAttribute('data-list', formatedList);
customElements.define("list-sidebar", ListSidebar);

// Set template nav
// customElements.whenDefined('nav-categories').then(() => {
//   var newItems = attachToShadowDom(listMock);
//   document.querySelector("nav-categories").setAttribute('data-list', newItems);
//   console.log(document.querySelector("nav-categories"));
// });
