import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'
import { UserService } from '../../shared/cuser.service';
import { AngularFireAuth } from 'angularfire2/auth';

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
        .size{
        font-size : 0.5rem
       }  
    `]
})

export class ViewDetailedAssetComponent implements OnInit {

    @Input() selectedAsset: any;
    public departments: any;
    public user: any;
    constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private cuser: UserService) {
        this.af.authState.subscribe(user => {
            if (user) {
                this.user = cuser.getCurrentUser();
            }

        })
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