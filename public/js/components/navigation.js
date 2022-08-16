export default class NavCategories extends HTMLElement {

  constructor(){
    super();

    // Get data value
    const newList = this.getAttribute('data-list');

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        ul, li {
          list-style: none;
          padding: 0;
        }
        a {
          color: #FFFFFF;
          font-weight: bold;
          text-decoration: none;
          text-transform: uppercase;
        }
        .categories-list {
          display: flex;
          justify-content: flex-start;
          gap: 0 4.5vw;
        }
      </style>
      <ul class="list categories-list">
        <li class="item-list-item categories-item home">
          <a href="/" class="link">Página Inicial</a>
        </li>
        ${newList}
        <li class="item-list-item categories-item contact">
          <a href="/" class="link">Contato</a>
        </li>
      </ul>
    `
    // Remove attr for clean Html
    this.removeAttribute('data-list')
  }

}
