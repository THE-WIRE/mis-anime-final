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

    private project_details : any ;
    constructor(private db: AngularFireDatabase) {
        db.list('/Projects',{
            query : {
                equalTo : '-KmQnlMUvIekkMPPAo9E',
                orderByKey : true,
                limitToFirst : 1
                
            }
        }).subscribe(
            res => {
                this.project_details = res ; 
                console.log('project details done');
                console.log(res)

            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() {
        
     }

}