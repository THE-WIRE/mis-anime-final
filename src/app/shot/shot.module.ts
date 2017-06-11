import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Shot } from './shot.component';
import { AddShotComponent } from './add-shot/add-shot.component';
import { AddShotVersionComponent } from './add-version/add-version.component';

export const routes = [
  { path: '', component: Shot, pathMatch: 'full' },
  { path: 'add', component: AddShotComponent, pathMatch: 'full' },
  { path: 'version/add', component: AddShotVersionComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Shot,
    AddShotComponent,
    AddShotVersionComponent
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
