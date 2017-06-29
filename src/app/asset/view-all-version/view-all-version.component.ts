import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AssetVersion } from '../asset-version.interface';
import * as firebase from 'firebase';
@Component({
    selector: 'view-all-version-asset',
    templateUrl: 'view-all-version.template.html',
    styles: [`
       
    `]
})

export class ViewAllAssetVersionComponent implements OnInit {

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
                        this.asset_versions.forEach(x => {
                            db.object('/Version_User_Stats/' + x.$key + '_' + this.af.auth.currentUser.uid).subscribe(y => {
                                x.stats = y;
                            })
                        })

                        console.log('refreshed');
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

    start(av) {

        this.check(av);
        let store = firebase.database.ServerValue.TIMESTAMP;
        let ts = new Date();
        let date: any = ts.getFullYear().toString() + ts.getMonth().toString() + ts.getDate().toString();

        let key = av.$key;
        const ref = firebase.database().ref('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date);
        const ref2 = firebase.database().ref('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid);

        ref.once('value', snap => {
            if (snap.val()) {
                this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid).update(
                    {
                        "status": 2
                    }
                ).then(x => {
                    console.log("this works!3");
                    this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date).update({
                        "start": store
                    }).then(y => {
                        this.snackbar.open("Working started on Asset : " + av.avercode, 'OK', { duration: 3000 });
                    })

                })

            }
            else {
                ref2.once('value', snap => {
                    if (snap.val()) {
                        this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid).update(
                            {
                                "status": 2
                            }
                        ).then(x => {
                            console.log("this works!");
                            this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date).update({
                                "start": store,
                                "init": store,
                                "total": 0
                            }).then(y => {
                                this.snackbar.open("Working started on Asset : " + av.avercode, 'OK', { duration: 3000 });
                            })

                        })
                    }
                    else {
                        this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid).update(
                            {
                                "init": store,
                                "status": 2,
                                "averid": key,
                                "uid": this.af.auth.currentUser.uid
                            }).then(x => {
                                console.log("this works!2");
                                this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date).update({
                                    "start": store,
                                    "init": store,
                                    "total": 0
                                }).then(y => {
                                    this.snackbar.open("Working started on Asset : " + av.avercode, 'OK', { duration: 3000 });
                                })

                            })
                    }
                });


            }
        });
    }

    pause(av) {
        let key = av.$key;
        console.log(key);
        let store = firebase.database.ServerValue.TIMESTAMP;
        const ref = firebase.database().ref('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid);
        let ts = new Date();
        let date: any = ts.getFullYear().toString() + ts.getMonth().toString() + ts.getDate().toString();
        console.log('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid);
        ref.once('value', snap => {
            let res = snap.val();
            console.log(res);
            if (res.status != 2) {
                return;
            }
            this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid).update(
                {
                    "status": -1
                }
            ).then(x => {
                this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date).update({
                    "pause": store,
                }).then(y => {
                    firebase.database().ref('/WorkingTree/' + this.af.auth.currentUser.uid + '/Task').update({ "status": -1 })
                    this.calc_total_time(key);
                    this.snackbar.open("Working paused on Asset : " + (av.avercode != undefined ? av.avercode : av.averid).toString(), 'OK', { duration: 3000 });
                })
            })
        });


    }

    calc_total_time(key) {
        let ts = new Date();
        let date: any = ts.getFullYear().toString() + ts.getMonth().toString() + ts.getDate().toString();

        const ref = firebase.database().ref('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date);
        const ref2 = firebase.database().ref('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid);

        let diff;

        ref.once('value', snap => {
            let res = snap.val();

            let init = res.total ? res.total : 0;
            diff = (res.pause - res.start);
            let total = init + diff;
            console.log(init, diff, total);
            this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid + '/daily/' + date).update(
                {
                    "total": total
                }
            )
        }).then(x => {
            ref2.once('value', snap => {
                let res = snap.val();
                let t = res.total ? res.total : 0;
                let total = t + diff;
                this.db.object('/Version_User_Stats/' + key + '_' + this.af.auth.currentUser.uid).update(
                    {
                        "total": total
                    }
                )
            });
        })


    }

    goToNotes(tab, key) {
        let obj = {
            "tab": tab,
            "key": key
        }
        this.selectedIndex.emit(obj);
    }

    check(av) {

        let ref = firebase.database().ref('/WorkingTree/' + this.af.auth.currentUser.uid + '/Task');

        ref.once('value', snap => {
            let val = snap.val()
            console.log(val);

            if (val && val.AssetVersionKey == av.$key) {

                ref.update({ "AssetVersionKey": av.$key, "status": 2 })

            }
            else if (val && val.AssetVersionKey != av.$key) {
                firebase.database().ref('/Version_User_Stats/' + val.AssetVersionKey + '_' + this.af.auth.currentUser.uid).once('value', res => {
                    if (res.val()) {
                        let r = res.val();
                        r.$key = r.averid;
                        console.log(r)
                        this.pause(r)
                        ref.update({ "AssetVersionKey": av.$key, "status": 2 })
                    }
                })
            }
            else {
                ref.update({ "AssetVersionKey": av.$key, "status": 2 })
            }

        })
    }
}