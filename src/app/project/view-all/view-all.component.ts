import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { ProjectService } from '../../shared/cproject.service';

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
    constructor(private db: AngularFireDatabase, public cproject: ProjectService) {
        db.list('/Projects').subscribe(
            res => {
                this.projects = res;
                console.log('refreshed');
            },
            err => {
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

    setGlobalProject(key) {
        this.cproject.cpid = key;

        console.log(this.cproject.getCurrentProjectId());
    }

}