/* 
  Every custom element must extend HTMLElement.
  This is still an Autonomous custom element.
*/
class Tooltip extends HTMLElement {
  // we cannot access DOM inside of the constructor bcz this custom element is NOT yet attached to the DOM
  constructor() {
    super(); // imp
    // private variable
    this._tooltipContainer;
    this._tooltipText = 'Dummy Text!'
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

    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    // add event listener for hover in 
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)); // so that 'this' inside of _showTooltip will always refer to this Tooltip object
    // add event listener for hover out 
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)); // so that 'this' inside of _showTooltip will always refer to this Tooltip object
    this.appendChild(tooltipIcon);
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
    // styling
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '10';
    this.appendChild(this._tooltipContainer);
  }

  /*
    Just a convention to use underscore in front of methods which will be only called inside the class.
  */
    _hideTooltip() {
      //console.log(this);
      this.removeChild(this._tooltipContainer);
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
