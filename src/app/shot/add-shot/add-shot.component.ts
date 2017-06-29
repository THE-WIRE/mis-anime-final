import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { ProjectService } from '../../shared/cproject.service';
import { Router } from '@angular/router'
import { NotificationService } from '../../shared/notification.service';

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

    constructor(private au: AngularFireAuth, private db: AngularFireDatabase, private cproj: ProjectService, private router: Router, private notify: NotificationService) {
        this.au.authState.subscribe(res => {
            if (res) {
                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }
            }
            else {
                this.router.navigate(['/login']);
            }
        })

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
                this.notify.add_notification_project_level('shot add', this.au.auth.currentUser.uid + ' created ' + this.shot.scode);
            })
        });
    }
}