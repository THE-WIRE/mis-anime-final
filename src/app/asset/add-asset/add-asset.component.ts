import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset.interface'

@Component({
    selector: 'add-asset',
    templateUrl: 'add-asset.template.html',
    styles: [`
        .asset-form{
            color: white;
        }
    `]
})

export class AddAssetComponent implements OnInit {

    public asset: Asset;

    constructor() { }

    ngOnInit() { }
}