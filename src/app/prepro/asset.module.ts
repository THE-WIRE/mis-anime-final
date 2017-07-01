import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '@angular/material';
import { NoteModule } from '../notes/note.module'
import { SharedModule } from '../shared/shared.module'

import { Asset } from './asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { ViewAllAssetComponent } from './view-all/view-all.component';
import { AssetDetailsComponent } from './details/details.component';
import { ViewDetailedAssetComponent } from './view-all/view-detailed.component';
import { Note } from '../notes/note.component'

import { AddAssetVersionComponent } from './add-version/add-version.component';
import { ViewAllAssetVersionComponent } from './view-all-version/view-all-version.component';
import { AssetVersionDetailsComponent } from './version-details/version-details.component';
import { ReviewAssetVersionComponent } from './review/review.component';
import { ReviewAllAssetVersionComponent } from './review-all/review-all.component';

export const routes = [
  { path: '', component: ViewAllAssetComponent, pathMatch: 'full' },
  { path: 'add', component: AddAssetComponent, pathMatch: 'full' },
  { path: 'all', component: ViewAllAssetComponent, pathMatch: 'full' },
  { path: 'details/:asset_id/:dept_name', component: AssetDetailsComponent, pathMatch: 'full' },
  { path: 'review/:asset_id/:dept_name', component: ReviewAssetVersionComponent, pathMatch: 'full' },
  { path: 'version/add/:asset_id/:dept_name', component: AddAssetVersionComponent, pathMatch: 'full' },
  //{ path: 'version/:dept_name/:id', component: ViewAllAssetVersionComponent, pathMatch: 'full' },
  { path: 'version/details', component: AssetVersionDetailsComponent, pathMatch: 'full' }

];

@NgModule({
  declarations: [
    Asset,
    AddAssetComponent,
    ViewAllAssetComponent,
    AssetDetailsComponent,
    AddAssetVersionComponent,
    ViewAllAssetVersionComponent,
    AssetVersionDetailsComponent,
    ViewDetailedAssetComponent,
    ReviewAssetVersionComponent,
    ReviewAllAssetVersionComponent
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
export class PreproModule {
  static routes = routes;
}