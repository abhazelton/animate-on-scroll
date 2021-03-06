
# ng2-animate-on-scroll

A very simple Angular directive with no dependencies that allows you to add CSS animations on elements, once that element has been reached via scrolling the page.  Works with whatever CSS animation you choose, including Animate.css as shown in examples. An example without animate.css can be found [here](https://angular-ivy-zznhm8.stackblitz.io), with animate.css can be found [here](https://withanimate.stackblitz.io).

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

**(Optional)**. The `animationName` attribute is for the name(s) of the CSS class(es) to be added at the time the element appears. In cases when no animation is required (e.g in a ngif case) specify null. Here is a real-world example if you were using the Animate.css library in your project:

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
## Options available
| Options | Type | Comments |
|:------------:|:-------------:|:-------------:|
| animationName | string/null | Add animation class or null in case no animation is required |
| offset | number | For scroll Listener, to add offsets |
| useScroll | boolean | Add for using scroll Listener, default is true and uses intersection observer |
| threshold | number | Add threshold value for intersection observer only |


## Developing ng2-animate-on-scroll with the demo application

1. After cloning this repo, install dependencies with `npm install`.
2. The command `npm run watch` will build the library in watch mode (you can alternately use `npm run build:lib` if you prefer not to run in watch mode). 3. Finally, `npm run start` will start the server for the demo app. If you prefer you can use `npm run dev:ssr` to start the demo in server rendered mode using Angular Universal.

## License

MIT © [Aaron Hazelton](mailto:abhazelton@gmail.com)
