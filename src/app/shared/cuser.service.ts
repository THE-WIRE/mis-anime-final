import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';

@Injectable()
export class UserService {

    public user: User;

    getCurrentUserId() {
        return this.user.uid != null ? this.user.uid : false;
    }

    getCurrentUser() {
        return this.user != null ? this.user : null;
    }

    loadUser(user) {
        this.user = {
            uid: user.uid,
            uname: user.username,
            utype: user.type,
            details: user.details
        }
    }

    loadProjects(val) {
        this.user.projects = [];
        val.forEach(x => {
            this.user.projects.push(x.pid);
        });
    }

    loadRole(val) {
        this.user.level = val.level;
        this.user.utype = val.role;
    }
}