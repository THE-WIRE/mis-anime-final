import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';


@Injectable()
export class ProjectService {

    public cpid: any;
    public ev$: EventEmitter<any>
    constructor(public c: CookieService, public af: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
        this.ev$ = new EventEmitter();
    }


    getCurrentProjectId() {
        let cp = this.c.getObject(this.af.auth.currentUser.uid + 'project');
        if (!cp) {
            this.router.navigate(['/project/all'])
        }
        else {
            return cp;
        }
    }


    getCurrentProject() {
        let cp = this.c.getObject(this.af.auth.currentUser.uid + 'project');
        if (!cp) {
            this.router.navigate(['/project/all'])
        }
        else {
            return cp;
        }
    }

    setCurrentProject(p) {
        this.c.putObject(this.af.auth.currentUser.uid + 'project', p);
    }

    trigger() {
        console.log('Inside trigger now emitted value from the service');
        this.ev$.emit('project changed');

    }
}