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

    public asset_versions: AssetVersion[];
    constructor(private db: AngularFireDatabase, public router: Router, public ar: ActivatedRoute) {

        console.log(ar.snapshot.params['dept_id'], ar.snapshot.params['id']);

        db.list('/Asset_version').subscribe(
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