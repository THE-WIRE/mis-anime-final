import { ProjectModule } from '../project/project.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { MaterialModule } from '@angular/material'

import { User } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewAllUserComponent } from './view-all/view-all.component';
import { UserDetailsComponent } from './details/details.component';
import { AssignUserComponent } from './assign-user/assign-user.component';

export const routes = [
  { path: '', component: User, pathMatch: 'full' },
  { path: 'add', component: AddUserComponent, pathMatch: 'full' },
  { path: 'all', component: ViewAllUserComponent, pathMatch: 'full' },
  { path: 'details', component: UserDetailsComponent, pathMatch: 'full' },
  { path: 'assign', component: AssignUserComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    User,
    AddUserComponent,
    ViewAllUserComponent,
    UserDetailsComponent,
    AssignUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule
  ]
})
export class UserModule {
  static routes = routes;
}
