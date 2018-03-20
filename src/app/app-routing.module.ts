import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ApplyNowComponent} from './apply-now/apply-now.component';
import {DynamicApplyNowComponent} from './dynamic-apply-now/dynamic-apply-now.component';

const routes: Routes = [
    { path: 'applynow', component: ApplyNowComponent },
    { path: 'dapplynow', component: DynamicApplyNowComponent },
    // { path: 'heroes', component: HeroesComponent },
    // { path: 'dashboard', component: DashboardComponent },
     { path: 'welcome', component: WelcomeComponent },
     { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    // { path: 'detail/:id', component: HeroDetailComponent }
  ];

  @NgModule({
    exports: [ RouterModule ],
    imports:[ RouterModule.forRoot(routes) ]
  })
  export class AppRoutingModule { }
  