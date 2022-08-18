export default class ToolbarSorter extends HTMLElement {
  constructor(){
    super();

    const shadowRoot = this.attachShadow({mode: "open"});
    this.sorts = ["Preço","A-Z","Z-A"];
    this.selectEl = document.createElement("select");
    this.selectEl.addEventListener("change", (ev)=>{
      this.triggerOnChange(ev);
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
    this.sorts.forEach((el, index)=>{
      let item = `
        <option id="${index}">${el}</option>
      `
      list += item
    })
    return list;
  }

  triggerOnChange(evt){
    console.log(evt);
    window.dispatchEvent(new CustomEvent("sort:list",{detail: {value: evt}}))
  }
}