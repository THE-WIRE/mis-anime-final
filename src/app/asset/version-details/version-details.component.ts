import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
    selector: 'version-details-asset',
    templateUrl: 'version-details.template.html',
    styles: [`
       .size{
        font-size : 0.5rem
       } 
    `]
})

export class AssetVersionDetailsComponent implements OnInit {

    public asset_version: AssetVersion[];
    constructor(private db: AngularFireDatabase, public router: Router, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                db.list('/Asset_version', {
                    query: {
                        equalTo: '-KmQbWh53Nq7QUcK6-JK',
                        orderByKey: true,
                        limitToFirst: 1

                    }
                }).subscribe(
                    res => {
                        this.asset_version = res;
                        console.log('Asset version details done');
                        console.log(res)

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

}