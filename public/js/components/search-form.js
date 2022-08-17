export default class SearchForm extends HTMLFormElement {

  constructor(){
    super();

    this.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(evt)
    })

  }



}