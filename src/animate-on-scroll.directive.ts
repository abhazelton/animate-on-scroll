import { Directive, Input, Renderer, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from './scroll.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Directive({
  selector: '[animateOnScroll]'
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {

  private offsetTop: number;
  private isVisible: boolean;
  private winHeight: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() animationName: string; // use fadeIn as default if not specified

  constructor(private elementRef: ElementRef, private renderer: Renderer, private scroll: ScrollService) { }

  ngOnInit(): void {

    // default visibility to false
    this.isVisible = false;

    // run visibility check initially in case the element is already visible in viewport
    this.manageVisibility();

    // subscribe to scroll event using service
    this.scroll.scrollObs.takeUntil(this.ngUnsubscribe)
                         .subscribe(() => this.manageVisibility());

    // subscribe to resize event using service so scrolling position is always accurate
    this.scroll.resizeObs.takeUntil(this.ngUnsubscribe)
                         .subscribe(() => this.manageVisibility());

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * check for visibility of element in viewport to add animation
   * 
   * @returns void
   */
  private manageVisibility(): void {

    // check for window height, may change with a window resize
    this.getWinHeight();

    // get vertical position for selected element
    this.getOffsetTop();

    // we should trigger the addition of the animation class a little after getting to the element
    const scrollTrigger = this.offsetTop + 80 - this.winHeight;

    // using values updated in service
    if (!this.isVisible && this.scroll.pos >= scrollTrigger) {
      this.addAnimationClass();
    }

  }

  /**
   * utility function to mark element visible and add css class
   * 
   * @returns void
   */
  private addAnimationClass(): void {

    // mark this element visible, we won't remove the class after this
    this.isVisible = true;

    // use default for animate.css if no value provided
    this.setClass(this.animationName);
  }

  /**
   * utility function to add css class to element in DOM
   * 
   * @param  {string} classname
   * @returns void
   */
  private setClass(classname: string): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, classname, true);
  }

  /**
   * get window height utility function
   *
   * @returns void
   */
  private getWinHeight(): void {

    this.winHeight = window.screen.height;

  }

  /**
   * get offsetTop value for element
   * 
   * @returns void
   */
  private getOffsetTop(): void {

    const viewportTop = this.elementRef.nativeElement.getBoundingClientRect().top;
    const clientTop = this.elementRef.nativeElement.clientTop;

    // get vertical position for selected element
    this.offsetTop = viewportTop + this.scroll.pos - clientTop;

  }

}
