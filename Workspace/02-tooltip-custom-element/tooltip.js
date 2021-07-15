/* 
  Every custom element must extend HTMLElement.
  This is still an Autonomous custom element.
*/
class Tooltip extends HTMLElement {
  // we cannot access real DOM inside of the constructor bcz this custom element is NOT yet attached to the DOM
  // but we can access shadow DOM
  constructor() {
    super(); // imp
    // private variable
    this._tooltipContainer;
    this._tooltipText = 'Dummy Text!';
    // shadow dom - also define whether you can access your shadow DOM tree from outside this component or not.
    // Invoking the built-in attchShadow() exposes an object called 'shadowRoot'
    this.attachShadow({ mode: 'open' }); // typically set to 'open' only

    // accessing the template defined in html file
    /*
    const template = document.querySelector('#tooltip-template');
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // take contents of template tag, true means deep clone
    */

    // usually we will have our template inside our custom element file which makes it truely reusable.
    // styles here will only apply to this shadow dom of this custom element
    this.shadowRoot.innerHTML = `
        <style>
          div {
            font-weight: normal;
            background-color: black;
            color: white;
            position: absolute;
            top: 1.5rem;
            left: 0.7rem
            z-index: 10;
            padding: 0.15rem;
            border-radius: 3px;
            box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
          }

          /* setting default styling for our custom component. we cannot use uc-tooltip here*/
          /*
          :host {
            background: red;
          } */

          /* setting conditional styling for our custom component. uc-tooltip element having "important" class */
          :host(.important) {
            background: var(--color-primary, #ccc);
            padding: 0.15rem
          }

          /* stylng based on surrounding conditions */
          :host-context(p) {
            font-weight: bold;
          }


          .icon {
            background: black;
            color: white;
            padding: 0.25rem;
            text-align: center;
            border-radius: 50%;
          }

          /* all slotted content that has 'highlight' class */
          ::slotted(.highlight) {
            border-bottom: 1px dotted red;
          }
        </style>
        <slot>Default value</slot> 
        <span class="icon"> (?)</span>
    `;
  }

  /*
  Lifecycle method: connectedCallback()
  Thi method is called when your element has been attached to the DOM 
  and therefore this is the place for DOM initializations. So this is where you can access the DOM.
  */
  connectedCallback() {
    if (this.hasAttribute('text')) {
      // store the attribute value in this class instance variable
      this._tooltipText = this.getAttribute('text'); // <uc-tooltip text="...">...</uc-tooltip>
    }

    const tooltipIcon = this.shadowRoot.querySelector('span'); // get from shadow DOM
    // add event listener for hover in
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)); // so that 'this' inside of _showTooltip will always refer to this Tooltip object
    // add event listener for hover out
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)); // so that 'this' inside of _showTooltip will always refer to this Tooltip object
    //this.appendChild(tooltipIcon); // attach to the main dom
    this.shadowRoot.appendChild(tooltipIcon); // attach to the shadow dom
    // styling tooltip
    this.style.position = 'relative';
  }

  /*
    Just a convention to use underscore in front of methods which will be only called inside the class.
  */
  _showTooltip() {
    //console.log(this);
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    //this.appendChild(this._tooltipContainer);// attach to the main dom
    this.shadowRoot.appendChild(this._tooltipContainer); // attach to the shadow dom
  }

  /*
    Just a convention to use underscore in front of methods which will be only called inside the class.
  */
  _hideTooltip() {
    //console.log(this);
    //this.removeChild(this._tooltipContainer); // remove from the main dom
    this.shadowRoot.removeChild(this._tooltipContainer); // remove from the shadow dom
  }

  /*
      Lifecycle hook: this executes when an observed attribute is updated.
      It receives 3 arguments - name of the attribute that got changed, old value and new value of that attribute

      JavaScript does not by default watch all the attributes of this element 
      because there might be a lot of elements which can change which you don't care about in your component.
    */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
  }

  // this is how we tel JS to 'observe' the property changes
  // this is accessible from outside class
  static get observedAttributes() {
    // return an array with all the attribute names you want to listen to changes.
    return ['text']; // <uc-tooltip text="...">...</uc-tooltip>
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
