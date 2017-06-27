import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
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
    constructor(private db: AngularFireDatabase, public cuser: UserService) {
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

    ngOnInit() { }

}