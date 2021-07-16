import { Component, h, Method, Prop, State } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true // to have shadow DOM
})
// stencil will automatically extend this class from HTML Element during build process
export class SideDrawer {

  /*
    Similar to Prop, Stencil will now watch attributes annotated with State for re-rendering,
    but it will only watch for changed from inside this component and not from outside.
    If you only expect changes from inside, use State, otherwise use Prop
  */
  @State() showContactInfo: boolean = false;

  /*
    Prop decorator adds automatic watcher, you could say.
    Stencil will now watch for attributes named 'title' on our component
    and if we set or change such an attribute, then stencil will detect this change
    and it will automatically rerun the render() method
    and it will do so in a very efficient manner so that it does not re-render the entire DOM
    that was generated based on that but only the parts of the DOM that changed.

    Stencil uses uni-directional flow, which is from outside to inside component.
    Props cannot be modified from inside the component. But can be modified outside.
    To make props mutable from inside, use mutable: true
  */
  @Prop({reflect: true}) title: string; //reflect: true to keep this class property in sync with tag attribute

  @Prop({reflect: true, mutable: true}) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChanged(content: string) {
    this.showContactInfo = content === 'contact';
  }

  // to expose this method outside
  @Method()
  open() {
    this.opened = true;
  }

  /*
    This is a method stencil will execute for us to parse the DOM it should generate as part of this component.
    And we have tp return JSX code
  */
  render() {
    // conditional content
    /*
    let content = null;
    if (this.open) {
      content = <aside>
        <header><h1>{this.title}</h1></header>
        <main>
          <slot></slot>
        </main>
      </aside>
    }
    return content; */

    let mainContent = <slot></slot>;

    if (this.showContactInfo) {

      mainContent = <div id="contact-information">
        <h2>Contact Information</h2>
        <p>You can reach us via Phone or Email.</p>
        <ul>
          <li>Phone: +91 1234567890</li>
          <li>Email: <a href="mailto:test@test.com">test@test.com</a></li>
        </ul>
      </div>
    }

    return <aside>
      <header>
        <h1>{this.title}</h1>
        <button onClick={this.onCloseDrawer.bind(this)}>X</button>
      </header>
      <section id="tabs">
        <button class={!this.showContactInfo ? 'active' :''}
                onClick={this.onContentChanged.bind(this, 'nav')}>Navigation</button>
        <button class={this.showContactInfo ? 'active' :''}
                onClick={this.onContentChanged.bind(this, 'contact')}>Contact</button>
      </section>
      <main>
        {mainContent}
      </main>
    </aside>
  }
}
