export default class SearchForm extends HTMLFormElement {

  constructor(){
    super();

    this.onsubmit = (evt) => {
      evt.preventDefault();
      const valInput = evt.currentTarget.elements[0].value;

      if(valInput){
        window.location.pathname = `${valInput}`
      }
    };

  }
}