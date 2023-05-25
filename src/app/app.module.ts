import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {GetStartedComponent} from "./components/get-started/get-started.component";
import {AppRouterModule} from "./app-router/app-router.module";

@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
