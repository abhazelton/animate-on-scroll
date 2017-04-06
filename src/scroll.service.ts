import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ScrollService {

  scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;

  constructor() {

    // set initial value
    this.manageScrollPos();

    // create observable that we can subscribe to from component or directive
    this.scrollObs = Observable.fromEvent(window, 'scroll');

    // initiate subscription to update values
    this.scrollObs.subscribe(() => this.manageScrollPos());

    // create observable for changes in screen size
    this.resizeObs = Observable.fromEvent(window, 'resize');

    // initiate subscription to update values
    this.resizeObs.subscribe(() => this.manageScrollPos());

  }


  private manageScrollPos() {

    // update service property
    this.pos = window.pageYOffset;

  }

}
