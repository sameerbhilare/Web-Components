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
  */
  @Prop() title: string;

  /*
    This is a method stencil will execute for us to parse the DOM it should generate as part of this component.
    And we have tp return JSX code
  */
  render() {
    //return <aside><h1>The Side Drawer</h1></aside>;
    return <aside>
      <header><h1>{this.title}</h1></header>
      <main>
        <slot></slot>
      </main>
    </aside>
  }
}
