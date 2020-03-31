import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes
  },
 ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
