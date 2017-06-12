import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface'
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'add-project',
    templateUrl: 'add-project.template.html',
    styles: [`
        .project-form{
            color: white;
        }
    `]
})

export class AddProjectComponent implements OnInit {
    
public project : Project;
    constructor(private db : AngularFireDatabase) {
            }

    ngOnInit() { }
    add(form){
        //form.pst = new Date();
        this.project = form;
        console.log(form);
        const add = this.db.list('/projects');
        add.push(this.project).then(_ => {console.log('project Added')})
 
    }
}