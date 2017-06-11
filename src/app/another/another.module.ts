import 'jquery-ui/ui/widgets/sortable.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AnotherPage } from './another.component.ts';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GridDemoModule } from '../layout/directives/grid-demo/grid-demo.module';

export const routes = [
  { path: '', component: AnotherPage, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, AngularFireDatabaseModule, GridDemoModule, RouterModule.forChild(routes)],
  declarations: [AnotherPage]
})
export class AnotherModule {
  static routes = routes;
}
