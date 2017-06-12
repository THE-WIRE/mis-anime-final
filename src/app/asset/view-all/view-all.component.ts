import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'view-all-asset',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllAssetComponent implements OnInit {

    public asset: Asset;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}