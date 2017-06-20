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
        table {
            color: white;
        }
        .off {
            cursor : pointer;
           
        }

        
    `]
})

export class ViewDetailedAssetComponent implements OnInit {

    @Input() selectedAsset: any;
    public departments: any;
    constructor(private db: AngularFireDatabase) {

    }


    ngOnInit() {

        switch (this.selectedAsset.atype) {
            case "char": this.selectedAsset.type = "character build";
                break;

            case "prop": this.selectedAsset.type = "prop build";
                break;

            case "set": this.selectedAsset.type = "set build";
                break;

        }
        console.log(this.selectedAsset.type)

        const obj = this.db.list('/Departments', {
            query: {
                orderByChild: 'type',
                equalTo: this.selectedAsset.type
            }
        }).subscribe(res => {
            console.log(res)
            this.departments = res
        })


    }

}