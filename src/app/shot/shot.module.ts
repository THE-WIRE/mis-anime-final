import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'
import { NoteModule } from '../notes/note.module'



import { Shot } from './shot.component';
import { AddShotComponent } from './add-shot/add-shot.component';
import { ViewAllShotComponent } from './view-all/view-all.component';
import { ShotDetailsComponent } from './details/details.component';
import { ViewDetailedShotComponent } from './view-all/view-detailed.component'
import { AddShotVersionComponent } from './add-version/add-version.component';
import { ViewAllShotVersionComponent } from './view-all-version/view-all-version.component';
import { ShotVersionDetailsComponent } from './version-details/version-details.component';



import { msToHmsPipe } from '../shared/mstohms.pipe'
import { StatusPipe } from '../shared/status.pipe';

export const routes = [
  { path: '', component: Shot, pathMatch: 'full' },
  { path: 'add', component: AddShotComponent, pathMatch: 'full' },
  { path: 'all', component: ViewAllShotComponent, pathMatch: 'full' },
  //{ path: 'details', component: ShotDetailsComponent, pathMatch: 'full' },
  { path: 'details/:shot_id/:dept_name', component: ShotDetailsComponent, pathMatch: 'full' },
  { path: 'version/add/:shot_id/:dept_name', component: AddShotVersionComponent, pathMatch: 'full' },

  //{ path: 'version/add', component: AddShotVersionComponent, pathMatch: 'full' },
  //{ path: 'version/all', component: ViewAllShotVersionComponent, pathMatch: 'full' },
  { path: 'version/details', component: ShotVersionDetailsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Shot,
    AddShotComponent,
    ViewAllShotComponent,
    ShotDetailsComponent,
    AddShotVersionComponent,
    ViewAllShotVersionComponent,
    ShotVersionDetailsComponent,
    ViewDetailedShotComponent,
    msToHmsPipe,
    StatusPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule,
    NoteModule
  ]
})
export class ShotModule {
  static routes = routes;
}
