import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserService } from '../../shared/cuser.service';

@Component({
    selector: 'view-all-user',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }

        

        .user-card-container {
          display: flex;
          flex-flow: column nowrap;
        }
        
        .user-card {
            margin: 20px;
            width: 350px;
        }

    `]
})

export class ViewAllUserComponent implements OnInit {

    public users: User[];
    public cuid: any;
    constructor(private db: AngularFireDatabase, public cuser: UserService, public af: AngularFireAuth, public router: Router, public loc: Location) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (cuser.getCurrentUser().type != 'manager') {
                    this.loc.back();
                }

                db.list('/Users').subscribe(
                    res => {
                        this.users = res;
                        console.log('refreshed');
                    },
                    err => {
                        console.log('something went wrong')
                    }
                )
            }
            else {
                this.router.navigate(['/login']);
            }
        })

    }

    ngOnInit() { }

}