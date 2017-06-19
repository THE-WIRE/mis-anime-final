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

    public asset: Asset[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Assets', {
            query: {
                equalTo: '-KmvbLe8R2g5Cc2GMMzK',
                orderByKey: true,
                limitToFirst: 1

            }
        }).subscribe(
            res => {
                this.asset = res[0];
                console.log('Asset details done');
                console.log(res[0])

            },
            err => {
                console.log('something went wrong')
            }
            )
    }

    ngOnInit() { }

}