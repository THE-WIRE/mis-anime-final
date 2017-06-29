import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";;
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserService } from '../../shared/cuser.service';

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.template.html',
    styles: [`
       
        .full-width{
            width: 100%;
        }

    `]
})

export class AddUserComponent implements OnInit {

    constructor(private db: AngularFireDatabase, public af: AngularFireAuth, public loc: Location, public router: Router, public cuser: UserService) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (cuser.getCurrentUser().type != 'manager') {
                    this.loc.back();
                }
            }
            else {
                this.router.navigate(['/login']);
            }
        })
    }

    ngOnInit() { }
    add(form) {
        form.crdate = Date.now();
        this.db.list('/userTemp').push(form);
    }

    selectedValue: string;

    users = [
        { value: 'shotartist', viewValue: 'Shot Artist' },
        { value: 'assetartist', viewValue: 'Asset Artist' },
        { value: 'supervisor', viewValue: 'Supervisor' },
        { value: 'vendor', viewValue: 'Vendor' },
        { value: 'manager', viewValue: 'Manager' }
    ];
}