import sortHandler from "../handler/sort-handler.js";

export default class ToolbarSorter extends HTMLElement {
  constructor(){
    super();

    const shadowRoot = this.attachShadow({mode: "open"});
    this.sorts = Object.keys(sortHandler);
    this.selectEl = document.createElement("select");
    this.selectEl.addEventListener("change", (ev)=>{
      this.triggerOnChange(ev.target.value);
    });

    shadowRoot.innerHTML = `
      <div class="toolbar-sorter">
      </div>
    `

  }
  connectedCallback(){
    
    var filtersRender = this.renderFilters();
    
    var template = document.createElement('template');
    template.innerHTML = filtersRender;

    this.selectEl.append(template.content);
    this.shadowRoot.children[0].append(this.selectEl);
    
  }

  renderFilters(){
    var list = ""
    this.sorts.forEach((el)=>{
      let item = `
        <option value="${el}">${el}</option>
      `
      list += item
    })
    return list;
  }

  triggerOnChange(val){
    window.dispatchEvent(new CustomEvent("sort:list",{detail: {value: val}}))
  }
}