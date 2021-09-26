import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { ScrollService } from "./scroll.service";
import { Subscription } from "rxjs";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[animateOnScroll]",
})
export class AnimateOnScrollDirective
  implements OnInit, OnDestroy, AfterViewInit
{
  private offsetTop: number;
  private isVisible: boolean;
  private winHeight: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();

  private get id(): string {
    return this.elementRef.nativeElement.id;
  }

  @Input() animationName: string | null; // use fadeIn as default if not specified, specify null for no animation
  // Pixel offset from screen bottom to the animated element to determine the start of the animation
  @Input() offset: number = 80; // for scroll Listener
  @Input() useScroll?: boolean;
  @Input() threshold?: number; // for intersection observer only for the time being

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private scroll: ScrollService
  ) {}

  ngOnInit(): void {
    if (!this.animationName) {
      return;
    }
    // default visibility to false
    this.isVisible = false;
    this.useScroll = this.useScroll
      ? this.useScroll
      : this.useScroll === false
      ? false
      : true;
    this.threshold = this.threshold ? this.threshold || 0.5 : 0.5;
    // using intersecting observer by default, else fallback to scroll Listener
    if ("IntersectionObserver" in window && this.useScroll) {
      const options: IntersectionObserverInit = {
        root: null,
        threshold: this.threshold,
        rootMargin: "0px",
      };
      const observer: IntersectionObserver = new IntersectionObserver(
        (entries, _) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            this.addAnimationClass();
          });
        },
        options
      );
      observer.observe(this.elementRef.nativeElement);
      return;
    }

    // subscribe to scroll event using service
    this.scrollSub = this.scroll.scrollObs.subscribe(() =>
      this.manageVisibility()
    );

    // subscribe to resize event using service so scrolling position is always accurate
    this.resizeSub = this.scroll.resizeObs.subscribe(() =>
      this.manageVisibility()
    );
  }

  ngAfterViewInit(): void {
    // run visibility check initially in case the element is already visible in viewport
    setTimeout(() => this.manageVisibility(), 1);
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

  /**
   * check for visibility of element in viewport to add animation
   *
   * @returns void
   */
  private manageVisibility(): void {
    if (this.isVisible) {
      // Optimisation; nothing to do if class has already been applied
      return;
    }

    // check for window height, may change with a window resize
    this.getWinHeight();

    // get vertical position for selected element
    this.getOffsetTop();

    // we should trigger the addition of the animation class a little after getting to the element
    const scrollTrigger = this.offsetTop + this.offset - this.winHeight;

    // using values updated in service
    if (this.scroll.pos >= scrollTrigger) {
      this.addAnimationClass();
    }
  }

  /**
   * utility function to mark element visible and add css class
   *
   * @returns void
   */
  private addAnimationClass(): void {
    // stops execution if no class is provided
    if (!this.animationName) {
      return;
    }

    // mark this element visible, we won't remove the class after this
    this.isVisible = true;

    // use default for animate.css if no value provided
    this.setClass(this.animationName);
  }

  /**
   * utility function to add one or more css classes to element in DOM
   *
   * @param  {string} classes
   * @returns void
   */
  private setClass(classes: string): void {
    for (const c of classes.split(" ")) {
      this.renderer.addClass(this.elementRef.nativeElement, c);
    }
  }

  /**
   * get window height utility function
   *
   * @returns void
   */
  private getWinHeight(): void {
    this.winHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  }

  /**
   * get offsetTop value for element
   *
   * @returns void
   */
  private getOffsetTop(): void {
    if (
      typeof this.elementRef.nativeElement.getBoundingClientRect === "function"
    ) {
      const viewportTop =
        this.elementRef.nativeElement.getBoundingClientRect().top;
      const clientTop = this.elementRef.nativeElement.clientTop;

      // get vertical position for selected element
      this.offsetTop = viewportTop + this.scroll.pos - clientTop;
    } else {
      this.offsetTop = 0;
    }
  }
}
