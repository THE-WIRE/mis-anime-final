import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'
import {AngularFireDatabase} from 'angularfire2/database'

@Component({
    selector: 'add-asset-version',
    templateUrl: 'add-version.template.html',
    styles: [`
        .asset-version-form{
            color: white;
        }
    `]
})

export class AddAssetVersionComponent implements OnInit {

    public asset_version: AssetVersion;

    constructor(private db : AngularFireDatabase) { }

    ngOnInit() { }

    add(form){
        this.asset_version = form;
        const add = this.db.list('/Asset_version')
        add.push(this.asset_version).then(_ => {console.log('Asset version Added')})
    }
}