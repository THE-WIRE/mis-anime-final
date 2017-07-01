import { Routes, RouterModule } from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: Layout, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      { path: 'shot', loadChildren: '../shot/shot.module#ShotModule' },
      { path: 'project', loadChildren: '../project/project.module#ShotModule' },
      { path: 'asset', loadChildren: '../asset/asset.module#AssetModule' },
      { path: 'prepro', loadChildren: '../prepro/asset.module#PreproModule' },
      { path: 'userdash', loadChildren: '../userdash/userdash.module#UserDashModule' },
      { path: 'another', loadChildren: '../another/another.module#AnotherModule' },
      { path: 'report', loadChildren: '../report/report.module#ReportModule' }
    ]
  }
];

export const ROUTES = RouterModule.forChild(routes);
