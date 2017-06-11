import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { Shot } from './shot.component';
import { AddShotComponent } from './add-shot/add-shot.component'

export const routes = [
  { path: '', component: Shot, pathMatch: 'full' },
  { path: 'add', component: AddShotComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Shot,
    AddShotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
  ]
})
export class ShotModule {
  static routes = routes;
}
