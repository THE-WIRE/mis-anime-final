import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'view-all-version-asset',
    templateUrl: 'view-all-version.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllAssetVersionComponent implements OnInit {

    public asset_version: AssetVersion;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}