import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'details-asset',
    templateUrl: 'details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class AssetDetailsComponent implements OnInit {

    public asset: Asset;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}