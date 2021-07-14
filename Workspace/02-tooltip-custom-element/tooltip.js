/* 
  Every custom element must extend HTMLElement.
  This is still an Autonomous custom element.
*/
class Tooltip extends HTMLElement {
  constructor() {
    super(); // imp
  }

  /*
    Lifecycle method: connectedCallback()
    Thi method is called when your element has been attached to the DOM 
    and therefore this is the place for DOM initializations. So this is where you can access the DOM.
  */
  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    this.appendChild(tooltipIcon);
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

  With that, we're telling Javascript that whenever you detect this HTML tag (uc-tooltip) in an HTML file, 
  you want to instantiate this class (Tooltip), 
  and you want to use that object for all the logic behind that custom element.
*/
customElements.define('uc-tooltip', Tooltip);
