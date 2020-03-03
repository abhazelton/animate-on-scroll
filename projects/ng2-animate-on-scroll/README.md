# Project Status

This project is in maintenance mode. Only bug fixes and new Angular version support is actively developed.
If you'd like new features, consider helping maintain the project.

# ng2-animate-on-scroll

A very simple Angular directive with no dependencies that allows you to add CSS animations on elements, once that element has been reached via scrolling the page.  Works with whatever CSS animation you choose, including Animate.css as shown in examples.

## Installation

To install the directive in your project, run:

```bash
$ npm install ng2-animate-on-scroll --save
```

## Using the directive

Modify the following in your app module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import third-party module
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // import module here
    AnimateOnScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use the directive in your component template:

```html
<div animateOnScroll animationName="animation-class-name"></div>
```

## animationName attribute

Required. The `animationName` attribute is for the name(s) of the CSS class(es) to be added at the time the element appears.  Here is a real-world example if you were using the Animate.css library in your project:

```html
<div class="container">

  long scrolling content..

  <div class="animated" animateOnScroll animationName="fadeIn">
    animated content upon appearing in the viewport..
  </div>

</div>
```

or

```html
<div class="container">

  long scrolling content..

  <div animateOnScroll animationName="animated fadeIn">
    animated content upon appearing in the viewport..
  </div>

</div>
```

### Animate.css Peculiarity

If you're using Animate.css with this component and you're trying to animate an element IN to view (fadeIn, slideInLeft etc), you may experience "flashing" when the element scrolls into the viewport (i.e. the element will be shown, then be hidden, then animate into view). This can be mitigated by overriding Animate.css's `.animated` class, then applying `visibility: hidden;` to the element you want to hide:

```css
.animated {
    visibility: visible !important;
}
.hide-on-init {
    visibility: hidden;
}
```

```html
<div class="container">

  long scrolling content..

  <div class="hide-on-init" animateOnScroll animationName="animated fadeIn">
    animated content upon appearing in the viewport..
  </div>

</div>
```

## offset attribute

You can also optionally add an `offset` attribute (thanks `siegerx3`) to specify the number of pixels you would need to scroll to *below* the top of the element for the animation to activate. The default is 80 pixels and the value given can be positive or negative.

```html
  <div animateOnScroll animationName="animated slideDown" offset="120">
    content with different pixel offset specified
  </div>
```

## Demo

An example of usage of the directory can be found at:
[https://github.com/abhazelton/animate-on-scroll-test](https://github.com/abhazelton/animate-on-scroll-test)

## License

MIT © [Aaron Hazelton](mailto:abhazelton@gmail.com)
