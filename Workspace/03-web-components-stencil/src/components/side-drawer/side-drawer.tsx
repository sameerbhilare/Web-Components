import { Component, h } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer'
})
// stencil will automatically extend this class from HTML Element during build process
export class SideDrawer {

  /*
    This is a method stencil will execute for us to parse the DOM it should generate as part of this component.
    And we have tp return JSX code
  */
  render() {
    return <div><h1>The Side Drawer</h1></div>;
  }
}
