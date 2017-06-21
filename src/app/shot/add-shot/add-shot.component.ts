import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase } from 'angularfire2/database'
import { ProjectService } from '../../shared/cproject.service';
import { Router } from '@angular/router'

@Component({
    selector: 'add-shot',
    templateUrl: 'add-shot.template.html',
    styles: [`
        .shot-form{
            color: white;
        },
        .form-horizontal{
            
        },
        .widget{
            color: black;
        }

        .full-width{
            width:100%;
        }
    `]
})

export class AddShotComponent implements OnInit {

    public shot: Shot;

    constructor(private db: AngularFireDatabase, private cproj: ProjectService, private router: Router) {
        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }
    }

    ngOnInit() { }

    add(form) {
        this.shot = form;
        const add = this.db.list('/Shots');
        //add.push(this.shot).then(_ => { console.log('Shot added') })
        const add_project_shot = this.db.list('/Project_Shot/');

        add.push(this.shot).then(_ => {
            add_project_shot.push({ "project_key": this.cproj.getCurrentProjectId(), "shot_key": _.key }).then(_ => {
                console.log('Relation added ')
            })
        });
    }
}