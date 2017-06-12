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

    public projects : Project[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Projects').subscribe(
            res => {
                this.projects = res ;
                console.log('refreshed'); 
            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}