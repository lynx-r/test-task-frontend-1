import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MyOwnCustomMaterialModuleModule} from './my-own-custom-material-module.module';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from 'ng-storages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyOwnCustomMaterialModuleModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
