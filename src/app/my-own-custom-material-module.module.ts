import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const COMPONENTS = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  BrowserAnimationsModule,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MyOwnCustomMaterialModuleModule {
}
