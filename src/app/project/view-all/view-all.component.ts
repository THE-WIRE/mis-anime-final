import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'view-all-project',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllProjectComponent implements OnInit {

    public project: Project;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}