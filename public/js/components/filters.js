export default class FilterSidebar extends HTMLElement {
  constructor(){
    super();

    const dataID = this.getAttribute("data-id")

    // Get data template
    const dataTemplate = document.getElementById(dataID);

    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <div class="filters">
        <div class="title">
          <h3>Filtre Por</h3>
        </div>
        <div class="filtered">
        </div>
        <div class="filters-list list">
        </div>
      </div>
    `

    shadowRoot.append(dataTemplate.content.cloneNode(true));

  }

  connectedCallback(){

  }

}