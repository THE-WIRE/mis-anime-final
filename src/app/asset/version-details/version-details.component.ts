import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'version-details-asset',
    templateUrl: 'version-details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class AssetVersionDetailsComponent implements OnInit {

    public asset_version: AssetVersion;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}