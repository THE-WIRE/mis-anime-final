import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.component';
import { Widget } from '../layout/widget/widget.directive';

import { MaterialModule } from '@angular/material';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProjectDetailsComponent } from '../project/details/details.component';

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Dashboard,
    Widget
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule {
  static routes = routes;
}
