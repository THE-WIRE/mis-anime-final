import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AssetVersion } from '../asset-version.interface';
import * as firebase from 'firebase';
@Component({
    selector: 'review-all-asset',
    templateUrl: 'review-all.template.html',
    styles: [`
    .size{
        font-size : 0.5rem
       }
    `]
})

export class ReviewAllAssetVersionComponent implements OnInit {

    public asset: any;
    public dept_id: any;
    public asset_id: any;
    public asset_versions: AssetVersion[];
    public stats: any[];
    @Output() selectedIndex = new EventEmitter();
    constructor(private db: AngularFireDatabase, public af: AngularFireAuth, public router: Router, public ar: ActivatedRoute, public snackbar: MdSnackBar) {

        this.af.authState.subscribe(res => {
            if (res) {
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

                    },
                    err => {
                        console.log('something went wrong')
                    })
            }
            else {
                this.router.navigate(['/login'])
            }
        })

    }
    ngOnInit() { }

    goToNotes(tab, key) {
        let obj = {
            "tab": tab,
            "key": key
        }
        this.selectedIndex.emit(obj);
    }
}