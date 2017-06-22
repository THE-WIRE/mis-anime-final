import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

    constructor(private db: AngularFireDatabase) {
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