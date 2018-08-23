import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ApplyNowComponent} from './apply-now/apply-now.component';
import {DynamicApplyNowComponent} from './dynamic-apply-now/dynamic-apply-now.component';
import {CanDeactivateGuard} from './services/can-deactivate-guard.service';
import {SomethingWentWrongComponent} from './something-went-wrong/something-went-wrong.component';
import { PropertiesComponent } from './properties/properties.component';

const routes: Routes = [
    { path: 'applynow', component: ApplyNowComponent },
    {path: 'props', component: PropertiesComponent},
    { path: 'dapplynow', component: DynamicApplyNowComponent,canDeactivate:[CanDeactivateGuard] },
    // { path: 'heroes', component: HeroesComponent },
    // { path: 'dashboard', component: DashboardComponent },
     { path: 'welcome', component: WelcomeComponent },
     { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    // { path: 'detail/:id', component: HeroDetailComponent }
    { path: 'oops', component: SomethingWentWrongComponent },
    { path: '**', component: SomethingWentWrongComponent }
  ];

  @NgModule({
    exports: [ RouterModule ],
    imports:[ RouterModule.forRoot(routes) ]
  })
  export class AppRoutingModule { }
  