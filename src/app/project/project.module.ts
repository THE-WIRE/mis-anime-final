import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'
import {AngularFireDatabaseModule} from 'angularfire2/database'

import { Project } from './project.component';
import { AddProjectComponent } from './add-project/add-project.component'

export const routes = [
  { path: '', component: Project, pathMatch: 'full' },
  { path: 'add', component: AddProjectComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Project,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule
  ]
})
export class ProjectModule {
  static routes = routes;
}
