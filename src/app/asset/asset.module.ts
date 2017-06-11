import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { Asset } from './asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component'

export const routes = [
  { path: '', component: Asset, pathMatch: 'full' },
  { path: 'add', component: AddAssetComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Asset,
    AddAssetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
  ]
})
export class AssetModule {
  static routes = routes;
}
