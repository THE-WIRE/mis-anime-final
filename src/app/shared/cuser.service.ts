import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';
import { CookieService } from 'ngx-cookie';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

    constructor(public c: CookieService, public af: AngularFireAuth, public db: AngularFireDatabase) { }

    getCurrentUser() {
        let user = this.c.getObject(this.af.auth.currentUser.uid + 'user')
        if (!user) {
            console.log('Loading User data...');
            this.db.object('/Users/' + this.af.auth.currentUser.uid).subscribe(x => {
                console.log(x);
                x.uid = this.af.auth.currentUser.uid
                this.c.putObject(this.af.auth.currentUser.uid + 'user', x)
                console.log('User data loaded!');
                return x;
            })

        }
        else {
            return user;
        }

    }

    getAllProjects() {
        let projects = this.c.getObject(this.af.auth.currentUser.uid + 'projects')
        if (!projects) {
            //load projects
            console.log('Loading Projects data...');
            this.db.list('/Project_User/', {
                query: {
                    orderByChild: 'uid',
                    equalTo: this.af.auth.currentUser.uid
                }
            }).subscribe(projects => {
                this.c.putObject(this.af.auth.currentUser.uid + 'projects', projects)
                console.log('Project data loaded!', projects);
            })

        }
        else {
            return projects;
        }

    }
    loadRole(val) {
        let user = this.c.getObject(this.af.auth.currentUser.uid + 'user')
        user['level'] = val.level;
        user['utype'] = val.role;
        this.c.putObject(this.af.auth.currentUser.uid + 'user', user);
    }
}