import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { TagInputModule } from 'ng2-tag-input';
import { UserService } from "../../shared/cuser.service";

import * as firebase from 'firebase';

@Component({
    selector: 'view-detailed-asset',
    templateUrl: 'view-detailed.template.html',
    styles: [`
        .off {
            cursor : pointer;
           
        }
    `]
})

export class ViewDetailedAssetComponent implements OnInit {

    @Input() selectedAsset: any;
    public departments: any;
    public user: any;
    public artists: any;
    public dept: any;
    public requestAutocompleteItems: any
    public input = new Subject<string>();
    public assigned = []

    constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private cuser: UserService) {
        this.af.authState.subscribe(user => {
            if (user) {
                this.user = cuser.getCurrentUser();
            }
        })

        this.requestAutocompleteItems =
            this.db.list('Users', {
                query: {
                    orderByChild: 'username',
                    startAt: this.input,
                    limitToFirst: 5
                }
            })

        this.requestAutocompleteItems.subscribe(res => {
            console.log(res);
        })
    }

    ngOnInit() {
        this.selectedAsset.type = "pre production";
        console.log(this.selectedAsset.type)

        const obj = this.db.list('/Departments', {
            query: {
                orderByChild: 'type',
                equalTo: this.selectedAsset.type
            }
        }).subscribe(res => {
            console.log(res)
            this.departments = res
            this.departments.forEach(x => {
                this.db.list('/Asset_Department/' + this.selectedAsset.$key + '_' + x.dname + '/Artists/').subscribe(y => {
                    console.log(y);
                    x.assigned = y;
                })
            })
        })
    }

    onAdd(event, dept) {
        console.log(event, dept);
        this.db.list('/Asset_Department/' + this.selectedAsset.$key + '_' + dept + '/Artists/').push(event);

    }

    onRemove(event, dept) {
        console.log(event, dept);

        firebase.database().ref('/Asset_Department/' + this.selectedAsset.$key + '_' + dept + '/Artists/').orderByChild('value').equalTo(event.value).once('value', snap => {
            let x = snap.val();
            console.log(x);
            for (let i in x) {
                console.log(i)
                this.db.object('/Asset_Department/' + this.selectedAsset.$key + '_' + dept + '/Artists/' + i).remove();
            }

        })
    }

    call(inp) {
        this.input.next(inp == "" ? '1111' : inp.toString());
        console.log('on key down worked', inp)
    }
}