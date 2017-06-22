import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as admin from 'firebase-admin';

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.template.html',
    styles: [`
        .user-form{
            color: white;
        }
    `]
})

export class AddUserComponent implements OnInit {

    public user: User;
    constructor(private db: AngularFireDatabase, public af: AngularFireAuth) {
        // console.log(admin.auth().getUserByEmail('artist@the-wire.com'));
    }

    ngOnInit() { }
    add(form) {
        form.crdate = Date.now();
        this.af.auth.createUserWithEmailAndPassword(form.uname, form.upass)
            .then(
            data => {
                form.upass = null;
                this.user = form;
                console.log(form, data);

                const add = this.db.list('/Users');
                add.push(this.user).then(_ => { console.log('user Added') })
            }
            )
            .catch(
            err => {
                console.log(err);
            });
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