import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'details-shot',
    templateUrl: 'details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ShotDetailsComponent implements OnInit {

    public shot: Shot[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Shots',{
            query : {
                equalTo : '-KmQYEq3bq21EPOW1jCo',
                orderByKey : true,
                limitToFirst : 1
                
            }
        }).subscribe(
            res => {
                this.shot = res ; 
                console.log('Shot details done');
                console.log(res)

            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}