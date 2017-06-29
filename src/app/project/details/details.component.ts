import { Component, OnInit } from '@angular/core';
import { Project } from '../project.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ProjectService } from '../../shared/cproject.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

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

    private project_details: any;
    constructor(private db: AngularFireDatabase, public cproject: ProjectService, public router: Router, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                db.list('/Projects', {
                    query: {
                        equalTo: '-KmQnlMUvIekkMPPAo9E',
                        orderByKey: true,
                        limitToFirst: 1

                    }
                }).subscribe(
                    res => {
                        this.project_details = res;
                        console.log('project details done');
                        console.log(res)

                    },
                    err => {
                        console.log('something went wrong')
                    })
            }
            else {
                this.router.navigate(['/login']);
            }
        })

    }

    ngOnInit() {

    }



}