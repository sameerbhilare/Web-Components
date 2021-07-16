import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true // to have shadow DOM
})
// stencil will automatically extend this class from HTML Element during build process
export class SideDrawer {

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

  @Prop({reflect: true, mutable: true}) open: boolean;

  onCloseDrawer() {
    this.open = false;
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

    return <aside>
      <header>
        <h1>{this.title}</h1>
        <button onClick={this.onCloseDrawer.bind(this)}>X</button>
      </header>
      <main>
        <slot></slot>
      </main>
    </aside>
  }
}
