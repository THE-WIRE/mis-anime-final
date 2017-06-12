import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'details-project',
    templateUrl: 'details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ProjectDetailsComponent implements OnInit {

    public project: Project;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}