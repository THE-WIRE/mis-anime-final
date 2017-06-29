import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { UserService } from '../../shared/cuser.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../shared/cproject.service';
import { MaterialModule } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'assign-user',
    templateUrl: 'assign-user.template.html',
    styles: [`

    `]
})

export class AssignUserComponent implements OnInit {

    public users: User[];
    public roles: any[] = [
        { name: 'Artist', value: 'artist' },
        { name: 'Supervisor', value: 'supervisor' },
        { name: 'Head Supervisor', value: 'head supervisor' },
        { name: 'Manager', value: 'manager' }
    ];
    public assignedUsers: any[] = [];
    public selectedValue: any[] = [];

    constructor(private db: AngularFireDatabase, public cuser: UserService, public toast: ToastrService, public router: Router, public cproj: ProjectService, public af: AngularFireAuth) {

        af.authState.subscribe(d => {
            if (!d) {
                router.navigate(['/login']);
            }
            else {
                if (cuser.getCurrentUser().type != 'manager') {
                    router.navigate(['/app']);
                }

                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }

                db.list('/Users').subscribe(res => {
                    this.users = res;
                    console.log(this.users);
                });

                db.list('/Project_User', {
                    query: {
                        orderByChild: 'pid',
                        equalTo: cproj.getCurrentProjectId()
                    }
                }).subscribe(res => {
                    this.assignedUsers = [];


                    res.forEach(y => {
                        db.object('/Users/' + y.uid).subscribe(z => {
                            y.username = z.username;
                            this.selectedValue[y.uid] = y.role;
                            this.assignedUsers.push(y)
                            console.log(y);
                        })
                    })

                    //this.assignedUsers = Array.from(new Set(this.assignedUsers));

                })



                // db.list('/Users').subscribe(
                //     res => {
                //         this.users = res;
                //         console.log('refreshed');
                //     },
                //     err => {
                //         console.log('something went wrong')
                //     }
                // )
            }
        })

    }

    ngOnInit() { }

    assignUser(val) {
        this.db.object('/Project_User/' + this.cproj.getCurrentProjectId() + '_' + val.user).set(
            {
                level: 0,
                pid: this.cproj.getCurrentProjectId(),
                uid: val.user
            }
        )
    }

    assignUserRole(user, role) {
        console.log(user, role);
        this.db.object('/Project_User/' + this.cproj.getCurrentProjectId() + '_' + user).update(
            {
                role: role
            }
        ).then(res => {
            this.toast.success('Role changed to ' + role, 'Operation Completed!');
        })
            .catch(err => {
                this.toast.error(err.message, 'Error Occured!');
            })
    }

}