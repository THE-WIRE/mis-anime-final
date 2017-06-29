import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";;
import { User } from '../user.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
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
    constructor(private db: AngularFireDatabase, public cuser: UserService, public af: AngularFireAuth, public router: Router, public loc: Location) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (cuser.getCurrentUser().type != 'manager') {
                    this.loc.back();
                }


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
                    })
            }
            else {
                this.router.navigate(['/login'])
            }
        })

    }

    ngOnInit() {

    }



}