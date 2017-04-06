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

The `animationName` attribute is for the name of the CSS class to be added at the time the element appears.  Here is a real-world example if you were using the Animate.css library in your project:

```html
<div class="container">

  long scrolling content..

  <div class="animated" animateOnScroll animationName="fadeIn">
    animated content upon appearing in the viewport..
  </div>

</div>
```

## Demo

An example of usage of the directory can be found at:
[https://github.com/abhazelton/animate-on-scroll-test](https://github.com/abhazelton/animate-on-scroll-test)

## License

MIT © [Aaron Hazelton](mailto:abhazelton@gmail.com)
