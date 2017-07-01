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
        this.selectedAsset.type = "pre production";
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