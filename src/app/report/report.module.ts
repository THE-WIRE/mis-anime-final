import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module'

import { Report } from './report.component';
import { UserAssets } from './user_assets_report/user_assets.component'

export const routes = [
  { path: '', component: Report, pathMatch: 'full' }

];

@NgModule({
  declarations: [
    Report,
    UserAssets
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule,
    SharedModule
  ],
  exports: [

  ]

})
export class ReportModule {
  static routes = routes;
}