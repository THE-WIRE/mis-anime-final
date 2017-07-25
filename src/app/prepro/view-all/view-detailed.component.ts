import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { TagInputModule } from 'ng2-tag-input';
import { UserService } from "../../shared/cuser.service";

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
    }

    public onAdding(tag) {
        console.log(tag);
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
                x.assigned = []
            })
        })
    }

    onAdd(event, dept) {
        console.log(event, dept);
        this.db.list('/Asset_Department/' + this.selectedAsset.$key + '_' + dept + '/Artists/').push(event);

    }

    onRemove(event) {
        console.log(event);

    }

    call(inp) {
        this.input.next(inp == "" ? '1111' : inp.toString());
        console.log('on key down worked', inp)
    }
}