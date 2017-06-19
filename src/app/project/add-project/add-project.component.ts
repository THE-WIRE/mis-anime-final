import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material'


@Component({
    selector: 'add-project',
    templateUrl: 'add-project.template.html',
    styles: [`

        .full-width{
            width:100%;
        }
    `]
})

export class AddProjectComponent implements OnInit {

    public project: Project;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }
    add(form) {

        //form.pst = new Date();
        form.pst = form.pst.valueOf();
        form.pendt = form.pendt.valueOf();
        this.project = form;
        // console.log(form, form.pst.valueOf());
        const add = this.db.list('/Projects');
        add.push(this.project).then(res => { console.log(res) })

    }

    projects = [
        { value: 'A', viewValue: 'A' },
        { value: 'B', viewValue: 'B' },
        { value: 'C', viewValue: 'C' }
    ];
}