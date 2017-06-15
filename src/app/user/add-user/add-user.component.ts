import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


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
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }
    add(form) {
        //form.pst = new Date();
        this.user = form;
        console.log(form);
        const add = this.db.list('/Users');
        add.push(this.user).then(_ => { console.log('user Added') })

    }
    selectedValue: string;

    users = [
        { value: 'A', viewValue: 'A' },
        { value: 'B', viewValue: 'B' },
        { value: 'C', viewValue: 'C' }
    ];
}