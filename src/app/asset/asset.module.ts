import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Asset } from './asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AddAssetVersionComponent } from './add-version/add-version.component';

export const routes = [
  { path: '', component: Asset, pathMatch: 'full' },
  { path: 'add', component: AddAssetComponent, pathMatch: 'full' },
  { path: 'version/add', component: AddAssetVersionComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Asset,
    AddAssetComponent,
    AddAssetVersionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule
  ]
})
export class AssetModule {
  static routes = routes;
}