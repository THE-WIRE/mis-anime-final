import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AssetVersion } from '../asset-version.interface';
import * as firebase from 'firebase';


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
    public asset_id: any;
    public asset_versions: AssetVersion[];
    @Output() selectedIndex = new EventEmitter();
    constructor(private db: AngularFireDatabase, public router: Router, public ar: ActivatedRoute, public snackbar: MdSnackBar) {

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

    start(av) {
        let store = firebase.database.ServerValue.TIMESTAMP;
        let key = av.$key;
        const ref = firebase.database().ref('/Asset_version/' + key + '/stats');

        ref.once('value', snap => {
            if (snap.val()) {
                this.db.object('/Asset_version/' + key + '/stats').update({ "start": store });
                this.snackbar.open("Working started on Asset : " + av.avercode, 'OK', { duration: 3000 });
            }
            else {
                this.db.object('/Asset_version/' + key + '/stats').update({ "start": store, "init": store });
                this.snackbar.open("Working started on Asset : " + av.avercode, 'OK', { duration: 3000 });
            }
        });
    }

    pause(av) {
        let key = av.$key;
        let store = firebase.database.ServerValue.TIMESTAMP;
        const ref = firebase.database().ref('/Asset_version/' + key + '/stats');

        ref.once('value', snap => {
            let res = snap.val();
            this.db.object('/Asset_version/' + key + '/stats').update({ "pause": store }).then(x => {
                this.calc_total_time(key);
                this.snackbar.open("Working paused on Asset : " + av.avercode, 'OK', { duration: 3000 });
            });
        });


    }

    calc_total_time(key) {

        const ref = firebase.database().ref('/Asset_version/' + key + '/stats');

        ref.once('value', snap => {
            let res = snap.val();

            let init = res.total ? res.total : 0;
            let diff = (res.pause - res.start);
            let total = init + diff;
            console.log(init, diff, total);
            this.db.object('/Asset_version/' + key + '/stats').update({ "total": total })
        });
    }

    goToNotes(av) {
        this.selectedIndex.emit(av);
    }
}