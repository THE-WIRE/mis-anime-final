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

    public assets: Asset[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Assets').subscribe(
            res => {
                this.assets = res ;
                console.log('refreshed'); 
            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}