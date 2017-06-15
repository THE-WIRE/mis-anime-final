import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../shared/cuser.service';

@Component({
    selector: 'details-user',
    templateUrl: 'details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class UserDetailsComponent implements OnInit {

    private user_details: any;
    constructor(private db: AngularFireDatabase, public cuser: UserService) {
        console.log("Reached");
        db.list('/Users', {
            query: {
                equalTo: '-KmQnlMUvIekkMPPAo9E',
                orderByKey: true,
                limitToFirst: 1

            }
        }).subscribe(
            res => {
                this.user_details = res;
                console.log('user details done');
                console.log(res)

            },
            err => {
                console.log('something went wrong')
            }
            )
    }

    ngOnInit() {

        console.log(this.cuser.getCurrentUserId());

    }



}