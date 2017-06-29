import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '@angular/material';
import { NoteModule } from '../notes/note.module'
import { SharedModule } from '../shared/shared.module'

import { Report } from './report.component';
import { Note } from '../notes/note.component'

export const routes = [
  { path: '', component: Report, pathMatch: 'full' }

];

@NgModule({
  declarations: [
    Report
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule,
    NoteModule,
    SharedModule
  ],
  exports: [

  ]

})
export class AssetModule {
  static routes = routes;
}