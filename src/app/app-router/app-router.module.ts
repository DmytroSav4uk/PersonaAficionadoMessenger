import { NgModule } from '@angular/core';

import {Routes, RouterModule} from "@angular/router";
import {GetStartedComponent} from "../components/get-started/get-started.component";


const routes: Routes = [
  {path:'',component:GetStartedComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRouterModule { }
