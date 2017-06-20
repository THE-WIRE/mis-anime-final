import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule } from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { Note } from './note.component';

export const routes = [
  { path: '', component: Note, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Note
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ],
  exports: [Note]
})
export class NoteModule {
  static routes = routes;
}
