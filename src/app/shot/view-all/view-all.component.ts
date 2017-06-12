import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'view-all-shot',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllShotComponent implements OnInit {

    public shots: Shot[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Shots').subscribe(
            res => {
                this.shots = res ;
                console.log('refreshed'); 
            },
            err =>{
                console.log('something went wrong')
            }
        )
    }
    ngOnInit() { }

}