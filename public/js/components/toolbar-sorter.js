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
        <div class="title">Ordenar Por</div>
        <style>
          .toolbar-sorter {
            display: flex;
            align-items: center;
          }
          .title {
            margin-right: 13px;
            color: #808185;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
          }
        </style>
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

  /**
   * Template string with sorting options
   * to insert in shadowRoot
   * @returns String
   */
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

  /**
   * Function that triggers a new CustomEvent
   * to window for other components
   * @param {String} val Selected value
   */
  triggerOnChange(val){
    window.dispatchEvent(new CustomEvent("sort:list",{detail: {value: val}}))
  }
}