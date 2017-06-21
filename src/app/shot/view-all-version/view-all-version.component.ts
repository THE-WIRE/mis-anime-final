import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ShotVersion } from '../shot-version.interface';
import * as firebase from 'firebase';


@Component({
    selector: 'view-all-version-shot',
    templateUrl: 'view-all-version.template.html',
    styles: [`
       
    `]
})


export class ViewAllShotVersionComponent implements OnInit {



    public shot: any;
    public dept_id: any;
    public shot_id: any;
    public shot_versions: ShotVersion[];
    @Output() selectedIndex = new EventEmitter();
    constructor(private db: AngularFireDatabase, public router: Router, public ar: ActivatedRoute, public snackbar: MdSnackBar) {

        console.log(ar.snapshot.params['dept_name'], ar.snapshot.params['shot_id']);
        this.dept_id = ar.snapshot.params['dept_name'];
        this.shot_id = ar.snapshot.params['shot_id'];

        db.list('/Shot_version', {
            query: {
                orderByChild: 's_d',
                equalTo: this.shot_id + '_' + this.dept_id
            }
        }).subscribe(
            res => {
                this.shot_versions = res;
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
        const ref = firebase.database().ref('/Shot_version/' + key + '/stats');

        ref.once('value', snap => {
            if (snap.val()) {
                this.db.object('/Shot_version/' + key + '/stats').update({ "start": store, "status": 2 });
                this.snackbar.open("Working started on Shot : " + av.svercode, 'OK', { duration: 3000 });
            }
            else {
                this.db.object('/Shot_version/' + key + '/stats').update({ "start": store, "init": store, "status": 2 });
                this.snackbar.open("Working started on Shot : " + av.svercode, 'OK', { duration: 3000 });
            }
        });
    }

    pause(av) {
        let key = av.$key;
        let store = firebase.database.ServerValue.TIMESTAMP;
        const ref = firebase.database().ref('/Shot_version/' + key + '/stats');

        ref.once('value', snap => {
            let res = snap.val();
            this.db.object('/Shot_version/' + key + '/stats').update({ "pause": store, "status": -1 }).then(x => {
                this.calc_total_time(key);
                this.snackbar.open("Working paused on Shot : " + av.svercode, 'OK', { duration: 3000 });
            });
        });


    }

    calc_total_time(key) {

        const ref = firebase.database().ref('/Shot_version/' + key + '/stats');

        ref.once('value', snap => {
            let res = snap.val();

            let init = res.total ? res.total : 0;
            let diff = (res.pause - res.start);
            let total = init + diff;
            console.log(init, diff, total);
            this.db.object('/Shot_version/' + key + '/stats').update({ "total": total, "status": -1 })
        });
    }

    goToNotes(av) {
        this.selectedIndex.emit(av);
    }
}