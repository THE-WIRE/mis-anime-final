import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material'

@Component({
    selector: 'details-asset',
    templateUrl: 'details.template.html',
    styles: [`
        }
        .view{
            color: white;
    `]
})

export class AssetDetailsComponent implements OnInit {

    public asset: any;
    public dept_id: any;
    public asset_id: any;
    public asset_versions: AssetVersion[];
    constructor(private db: AngularFireDatabase, public router: Router, public ar: ActivatedRoute) {

        console.log(ar.snapshot.params['dept_name'], ar.snapshot.params['asset_id']);
        this.dept_id = ar.snapshot.params['dept_name'];
        this.asset_id = ar.snapshot.params['asset_id'];

        db.list('/Asset_version', {
            query: {
                orderByChild: 'a_d',
                equalTo: this.asset_id + '_' + this.dept_id
            }
        }).subscribe(
            res => {
                this.asset_versions = res;
                console.log('refreshed');
            },
            err => {
                console.log('something went wrong')
            }
            )
    }
    ngOnInit() { }

}