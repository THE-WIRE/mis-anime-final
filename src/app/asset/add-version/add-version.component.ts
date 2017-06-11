import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'

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

    constructor() { }

    ngOnInit() { }
}