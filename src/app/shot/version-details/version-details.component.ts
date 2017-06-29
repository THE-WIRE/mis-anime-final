import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
    selector: 'version-details-shot',
    templateUrl: 'version-details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ShotVersionDetailsComponent implements OnInit {

    public shot_version: ShotVersion[];
    constructor(private db: AngularFireDatabase, public af: AngularFireAuth, public router: Router) {
        this.af.authState.subscribe(res => {
            if (res) {
                db.list('/Shot_version', {
                    query: {
                        equalTo: '-KmQx5Zk2HRorBFtFJRc',
                        orderByKey: true,
                        limitToFirst: 1

                    }
                }).subscribe(
                    res => {
                        this.shot_version = res;
                        console.log('Shot version details done');
                        console.log(res)

                    },
                    err => {
                        console.log('something went wrong')
                    }
                    )
            }
            else {
                this.router.navigate(['/login']);
            }
        })

    }

    ngOnInit() { }

}