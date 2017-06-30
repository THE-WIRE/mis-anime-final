import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'

import * as firebase from 'firebase'

@Component({
    selector: 'user-assets',
    styleUrls: ['./user_assets.component.css'],
    templateUrl: './user_assets.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'user_assets-page app'
    }
})
export class UserAssets {

    @Input() currentid: any
    public assets: any
    public daily: any[]

    constructor(private af: AngularFireDatabase) {

    }

    ngOnInit() {
        console.log(this.currentid);
        this.af.list('Version_User_Stats', {
            query: {
                orderByChild: 'uid',
                equalTo: this.currentid
            }
        }).subscribe(res => {
            console.log(res);
            this.assets = res
        })
    }

    dailyreport(verid) {
        this.af.list('Version_User_Stats/' + verid + '_' + this.currentid + '/daily').subscribe(res => {
            console.log('this is a daily response: ', res);
            this.daily = res
        })
    }

}
