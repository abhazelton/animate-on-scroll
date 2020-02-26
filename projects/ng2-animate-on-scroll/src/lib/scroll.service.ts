import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, empty, fromEvent } from 'rxjs';

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
    this.scrollObs = typeof window !== 'undefined' ? fromEvent(window, 'scroll') : empty();

    // initiate subscription to update values
    this.scrollSub = this.scrollObs
      .subscribe(() => this.manageScrollPos());

    // create observable for changes in screen size
    this.resizeObs = typeof window !== 'undefined' ? fromEvent(window, 'resize') : empty();

    // initiate subscription to update values
    this.resizeSub = this.resizeObs
      .subscribe(() => this.manageScrollPos());

  }


  private manageScrollPos(): void {

    // update service property
    this.pos = typeof window !== 'undefined' ? window.pageYOffset : 0;

  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

}
