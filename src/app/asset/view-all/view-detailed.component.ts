import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'

@Component({
    selector: 'view-detailed-asset',
    templateUrl: 'view-detailed.template.html',
    styles: [`
        .view{
            color: white;
        }

        
    `]
})

export class ViewDetailedAssetComponent implements OnInit {

    @Input() selectedAsset: any;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}