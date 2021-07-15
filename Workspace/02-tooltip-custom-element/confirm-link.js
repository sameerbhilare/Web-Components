// extending built-in anchor tag element
// idea here is - it willask user whether he really wants to navigate
class ConfirmLink extends HTMLAnchorElement {

  /*
  Lifecycle method: connectedCallback()
  This method is called when your element has been attached to the DOM 
  and therefore this is the place for DOM initializations. So this is where you can access the DOM.
  */
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm('Do you really want to leave?')) {
        // if user dont want to leave, prevent default
        event.preventDefault();
      }
    });
  }
}

/*
  customElements is built-in JS object. It allows us to register our custom elements.
*/
customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' }); // extending the <a> tag
