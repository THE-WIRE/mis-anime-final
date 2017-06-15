import { Routes } from '@angular/router';

export const ROUTES: Routes = [{
  path: '', redirectTo: 'app', pathMatch: 'full'
},
{
  path: 'app', loadChildren: './layout/layout.module#LayoutModule'
},
{
  path: 'project', loadChildren: './project/project.module#ProjectModule'
},
{
  path: 'asset', loadChildren: './asset/asset.module#AssetModule'
},
{
  path: 'shot', loadChildren: './shot/shot.module#ShotModule'
},
{
  path: 'user', loadChildren: './user/user.module#UserModule'
},
{
  path: 'login', loadChildren: './login/login.module#LoginModule'
}, {
  path: 'error', loadChildren: './error/error.module#ErrorModule'
}, {
  path: '**', loadChildren: './error/error.module#ErrorModule'
}
];
