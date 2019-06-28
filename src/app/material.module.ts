import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';


import { NgModule } from '@angular/core';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSelectModule],
})
export class MyOwnCustomMaterialModule { }