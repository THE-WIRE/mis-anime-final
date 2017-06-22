import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule } from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { UserDashComponent } from './userdash.component';

export const routes = [
  { path: '', component: UserDashComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    UserDashComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ]
})
export class UserDashModule {
  static routes = routes;
}
