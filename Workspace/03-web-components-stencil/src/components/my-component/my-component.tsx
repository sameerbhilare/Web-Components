import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

/*
  Stencil automatically extends HTML Element
*/

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    /*
      Stencil.js contains a tool that parses below code
      and converts it to Javascript that will then write it into the real DOM.
      It has a couple of convenience features included,
      for example it has a couple of features that will automatically rerun this render function
      when you change some input to the render functions.
    */
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
