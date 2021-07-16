/* 
  Every custom element must extend HTMLElement.
  This is still an Autonomous custom element.
*/
class Modal extends HTMLElement {
  constructor() {
    super(); // must

    this.isOpen = false;

    // creating shadow DOM
    this.attachShadow({ mode: 'open' });

    // use shadowRoot exposed by above call
    // see <slot> bcz I want to be able to pass the content that is displayed as a message into this modal from outside
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
              opacity: 0; /* initial not visible */
              pointer-events: none; /* initial not visible */
          }

          /* change the styles based on when 'opened' attr is present on us-modal tag */
          :host([opened]) #backdrop,
          :host([opened]) #modal {
              opacity: 1;
              pointer-events: all;
          }

          :host([opened]) #modal {
              top: 15vh;
          }

          #modal {
              position: fixed;
              top: 10vh;
              left: 25%;
              width: 50%;
              z-index: 100;
              background: white;
              border-radius: 3px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.26);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              opacity: 0; /* initial not visible */
              pointer-events: none; /* initial not visible */
              transition: all 0.3s ease-out;
          }

          header {
              padding: 1rem;
              border-bottom: 1px solid #ccc;
          }

          ::slotted(h1) {
              font-size: 1.25rem;
              margin: 0;
          }

          #main {
              padding: 1rem;
          }

          #actions {
              border-top: 1px solid #ccc;
              padding: 1rem;
              display: flex;
              justify-content: flex-end;
          }

          #actions button {
              margin: 0 0.25rem;
          }

        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">Confirm</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Okay</button>
            </section>
        </div>
    `;

    // accessing slots
    const slots = this.shadowRoot.querySelectorAll('slot');
    // targetting the unnamed slot, which is at 2nd position in our template
    slots[1].addEventListener('slotchange', event => {
      // dir prints object
      console.dir(slots[1].assignedNodes()); // this is how we get access to the real DOM element content used for this slot.
    });

    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
    const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');

    backdrop.addEventListener('click', this._cancel.bind(this)); // close the modl on click outside modal
    cancelBtn.addEventListener('click', this._cancel.bind(this)); // 'this' inside of hind() should refer to Modal and not the Button
    confirmBtn.addEventListener('click', this._confirm.bind(this)); // 'this' inside of hind() should refer to Modal and not the Button

    /*
    cancelBtn.addEventListener('cancel', () => {
      console.log('cancel inside component...');
    });*/
  }

  /*
    Lifecycle hook: this executes when an observed attribute is updated.
    It receives 3 arguments - name of the attribute that got changed, old value and new value of that attribute

    JavaScript does not by default watch all the attributes of this element 
    because there might be a lot of elements which can change which you don't care about in your component.
  */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
    
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
      // the better option to change the style is NOT here but inside template above
      // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
      // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
      // this.shadowRoot.querySelector('#modal').style.opacity = 1;
      // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    } else {
      this.isOpen = false;
    }
  }

  // Callback: this is how we tell JS to 'observe' the property changes
  // this is accessible from outside class
  static get observedAttributes() {
    // return an array with all the attribute names you want to listen to changes.
    return ['opened']; // <uc-modal opened>...</uc-modal>
  }

  // public method
  // abstracting the complexity within this Modal class
  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  // abstracting the complexity within this Modal class
  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this.isOpen = false;
  }

  // private method
  _cancel(event) {
    this.hide();

    // way 1
    // create a 'cancel' event
    // event name is imp. This is exactly what we will use outside
    // 'bubbles' whether this event should bubble up the DOM tree if not handled
    // composed: true means the event should leave shadow dom tree, if false, the event must not leave the shadow DOM tree
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true }); 
    // dispatchEvent takes totally new event. Fire the 'cancel' event 
    // If you dont pass required options to Event constructor above, 
    // then but it will be only dispatched to the event.target which is the cancel button in our case.
    event.target.dispatchEvent(cancelEvent);
  }

  // private method
  _confirm() {
    this.hide();

    // way 2
    // no additional options required as we are triggering event directly on our custom element which is present in the real DOM
    const confirmEvent = new Event('confirm'); 
    // directly dispatching on our custom element as it extends HTMLElement
    this.dispatchEvent(confirmEvent);
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
