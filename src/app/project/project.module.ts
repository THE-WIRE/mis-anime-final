import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { Project } from './project.component';

export const routes = [
  { path: '', component: Project, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Project
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectModule {
  static routes = routes;
}
