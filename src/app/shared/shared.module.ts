import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { msToHmsPipe } from './mstohms.pipe';
import { StatusPipe } from './status.pipe'
import { UnamePipe } from './Uname.pipe'
import { AssetPipe } from './asset_version_id_pipes/getAsset.pipe'
import { DepNamePipe } from './asset_version_id_pipes/getDepartment.pipe'
import { ProjNamePipe } from './asset_version_id_pipes/getProject.pipe'
import { VerCodePipe } from './asset_version_id_pipes/versionCode.pipe'
import { VersionStatus } from './asset_version_id_pipes/getAssetVStatus.pipe'
import { UserRole } from './notes_pipes/get_user_role.pipe'



@NgModule({
    imports: [
        AngularFireModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    exports: [
        msToHmsPipe,
        StatusPipe,
        UnamePipe,
        AssetPipe,
        DepNamePipe,
        ProjNamePipe,
        VerCodePipe,
        VersionStatus,
        UserRole
    ],
    declarations: [
        msToHmsPipe,
        StatusPipe,
        UnamePipe,
        AssetPipe,
        DepNamePipe,
        ProjNamePipe,
        VerCodePipe,
        VersionStatus,
        UserRole
    ],
    providers: [],
})
export class SharedModule { }
