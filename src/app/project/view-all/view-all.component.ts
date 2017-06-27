import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { ProjectService } from '../../shared/cproject.service';
import { UserService } from '../../shared/cuser.service';
import { Router } from '@angular/router';
@Component({
    selector: 'view-all-project',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }

        

        .project-card-container {
          display: flex;
          flex-flow: column nowrap;
        }
        
        .project-card {
            margin: 20px;
            width: 350px;
        }

    `]
})

export class ViewAllProjectComponent implements OnInit {

    public projects: Project[];
    public cpid: any;
    constructor(private db: AngularFireDatabase, public cproject: ProjectService, public location: Location, public cuser: UserService, public router: Router, public af: AngularFireAuth) {

        this.af.authState.subscribe(res => {
            if (res && res.uid) {
                let user = cuser.getCurrentUser();
                user.projects = cuser.getAllProjects();
                console.log(user);

                this.projects = [];

                if (cuser.getCurrentUser().type && cuser.getCurrentUser().type == 'manager') {
                    db.list('/Projects').subscribe(res => {
                        this.projects = res;
                    })
                } else {
                    user.projects.forEach(project => {
                        db.object('/Projects/' + project.pid).subscribe(res => {
                            this.projects.push(res);
                        })
                    })
                }
            } else {
                router.navigate(['/login']);
            }
        });
    }

    ngOnInit() { }

    setGlobalProject(key) {


        this.db.object('/Project_User/' + key + '_' + this.af.auth.currentUser.uid).subscribe(res => {
            console.log(res);
            if (this.cuser.getCurrentUser().type != 'manager' && res.role) {
                this.cuser.loadRole(res);
            }
            else if (this.cuser.getCurrentUser().type != 'manager' && !res.role) {
                throw new Error('Role is not defined for project : ' + key);
            }
            this.cproject.setCurrentProject(key)
            this.location.back();
        })
    }
}