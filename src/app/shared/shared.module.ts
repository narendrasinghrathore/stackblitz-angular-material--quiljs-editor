import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontHugeDirective } from './font-huge.directive';
import { ModuleWithProviders } from '@angular/core';

@NgModule({
  declarations: [FontHugeDirective],
  imports: [
    CommonModule
  ],
  exports: [FontHugeDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,

    };
  }
}
