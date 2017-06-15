import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database'


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
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
  ]
})
export class NoteModule {
  static routes = routes;
}
