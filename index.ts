import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective, ScrollService } from './src';

export * from './src/animate-on-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnimateOnScrollDirective
  ],
  exports: [
    AnimateOnScrollDirective
  ]
})
export class AnimateOnScrollModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AnimateOnScrollModule,
      providers: [ ScrollService ]
    };
  }
}
