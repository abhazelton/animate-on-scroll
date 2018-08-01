import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Injectable()
export class ScrollService implements OnDestroy {

  scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();

  constructor() {

    // set initial value
    this.manageScrollPos();

    // create observable that we can subscribe to from component or directive
    this.scrollObs = fromEvent(window, 'scroll');

    // initiate subscription to update values
    this.scrollSub = this.scrollObs
      .subscribe(() => this.manageScrollPos());

    // create observable for changes in screen size
    this.resizeObs = fromEvent(window, 'resize');

    // initiate subscription to update values
    this.resizeSub = this.resizeObs
      .subscribe(() => this.manageScrollPos());

  }


  private manageScrollPos(): void {

    // update service property
    this.pos = window.pageYOffset;

  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

}
