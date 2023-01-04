export default class NavCategories extends HTMLElement {

  constructor(){
    super();

    // Get data value
    const newList = this.getAttribute("data-list");
    const dataID = this.getAttribute("data-id");

    // Get template
    const dataTemplate = document.getElementById(dataID);

    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <ul class="list">
        <li class="item-list-item home">
          <a href="/" class="link">Página Inicial</a>
        </li>
        ${newList}
        <li class="item-list-item contact">
          <a href="/" class="link">Contato</a>
        </li>
      </ul>
    `

    shadowRoot.append(dataTemplate.content.cloneNode(true));

    // Remove attr for clean Html
    this.removeAttribute('data-list')
  }

}
