/* 
  Every custom element must extend HTMLElement.
  This is still an Autonomous custom element.
*/
class Modal extends HTMLElement {
  constructor() {
    super(); // must

    // creating shadow DOM
    this.attachShadow({ mode: 'open' });

    // use shadowRoot exposed by above call
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: 10;
            }
            #modal {
                position: fixed;
                top: 15vh;
                left: 25%;
                width: 50%;
                height: 30rem;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal"></div>
    `;
  }
}

/*
  customElements is built-in JS object. It allows us to register our custom elements.
  customElements.define() take at least 2 parameters.
    1st parameter is our custom element tag name. 
    The tag name must be a single word with at least 2 parts seperated by dashes.
    The reason for that is all built-in elements are single words without dashes. 
    So to avoid overriding existing elements and also to make it future proof (new elements added in HTML in future).
  The 2nd argument is your Javascript class that holds the logic for this custom element.

  With that, we're telling Javascript that whenever you detect this HTML tag (uc-modal) in an HTML file, 
  you want to instantiate this class (Modal), 
  and you want to use that object for all the logic behind that custom element.
*/
customElements.define('uc-modal', Modal);
