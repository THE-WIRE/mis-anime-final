import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
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
    constructor(private db: AngularFireDatabase, public cproject: ProjectService, public location: Location, public cuser: UserService, public router: Router) {

        if (!cuser.getCurrentUser()) {
            router.navigate(['/login']);
        }

        let user = cuser.getCurrentUser();

        this.projects = [];

        user.projects.forEach(project => {
            db.object('/Projects/' + project).subscribe(res => {
                this.projects.push(res);
            })
        })
    }

    ngOnInit() { }

    setGlobalProject(key) {


        this.db.object('/Project_User/' + key + '_' + this.cuser.getCurrentUserId()).subscribe(res => {
            console.log(res);
            if (this.cuser.getCurrentUser().utype != "manager" && res.role) {
                this.cuser.loadRole(res);
            }

            this.cproject.cpid = key;
            this.cproject.trigger();
            this.location.back();
        })
    }
}