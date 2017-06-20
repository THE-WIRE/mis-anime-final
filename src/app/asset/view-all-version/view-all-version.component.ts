import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'view-all-version-asset',
    templateUrl: 'view-all-version.template.html',
    styles: [`
        }
        .view{
            color: white;
    `]
})

export class ViewAllAssetVersionComponent implements OnInit {

    public asset: any;
    public dept_id: any;
    public asset_versions: AssetVersion[];
    constructor(private db: AngularFireDatabase, public router: Router, public ar: ActivatedRoute) {

        console.log(ar.snapshot.params['dept_id'], ar.snapshot.params['id']);
        this.dept_id = ar.snapshot.params['dept_id'];

        db.object('/Assets/' + ar.snapshot.params['id']).subscribe(res => {
            console.log(res);
            this.asset = res;
        })

        db.list('/Asset_version', {
            query: {
                orderByChild: 'dept',
                equalTo: this.dept_id
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