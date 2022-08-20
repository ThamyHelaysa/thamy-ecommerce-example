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
          :host {
            flex: 0 1 40%;
          }
          @media (max-width: 768px){
            :host {
              flex: 1 auto;
            }
          }
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
            white-space: nowrap;
          }
          .select {
            flex: 0 1 100%;
            display: inline-block;
            height: 27px;
            appearance: none;
            border-radius: 5px;
            border: 1px solid #E2DEDC;
            font-family: inherit;
            padding: 4px 8px 4px 13px;
            background-color: #FFFFFF;
            background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.96 7.77L12 13.73L6.03998 7.76C4.93998 6.66 3.24998 8.34 4.35998 9.45L11.16 16.25C11.63 16.72 12.38 16.72 12.85 16.25L19.65 9.45C20.73 8.35 19.07 6.67 17.96 7.77Z' fill='rgba(0,0,0,0.3)'/%3E%3C/svg%3E%0A");
            background-repeat: no-repeat;
            background-position: right 8px center;
            background-size: 16px;
          }
        </style>
      </div>
    `

  }
  connectedCallback(){
    
    var filtersRender = this.renderFilters();
    
    var template = document.createElement('template');
    template.innerHTML = filtersRender;

    this.selectEl.classList.add("select");
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