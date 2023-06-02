import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule,NgIf } from '@angular/common';

import {AppComponent} from './app.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {GetStartedComponent} from "./components/get-started/get-started.component";
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { ChatComponent } from './components/chat/chat.component';




const routes: Routes = [
  {path:'',component:GetStartedComponent},
  {path:'auth',component:AuthRegisterComponent},
  {path:'main' ,component:UserMainPageComponent},
  {path:'chat' ,component:ChatComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent,
    AuthRegisterComponent,
    UserMainPageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
