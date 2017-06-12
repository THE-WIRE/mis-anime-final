import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'version-details-shot',
    templateUrl: 'version-details.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ShotVersionDetailsComponent implements OnInit {

    public shot_version: ShotVersion[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Shot_version',{
            query : {
                equalTo : '-KmQx5Zk2HRorBFtFJRc',
                orderByKey : true,
                limitToFirst : 1
                
            }
        }).subscribe(
            res => {
                this.shot_version = res ; 
                console.log('Shot version details done');
                console.log(res)

            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}