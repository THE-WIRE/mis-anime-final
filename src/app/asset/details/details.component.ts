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
        db.list('/Assets',{
            query : {
                equalTo : '-KmQ_TtKMKrxhnkfarMX',
                orderByKey : true,
                limitToFirst : 1
                
            }
        }).subscribe(
            res => {
                this.asset = res ; 
                console.log('Asset details done');
                console.log(res)

            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}