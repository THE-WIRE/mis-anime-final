import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
    selector: 'view-all-version-shot',
    templateUrl: 'view-all-version.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllShotVersionComponent implements OnInit {

    public shot_versions: ShotVersion[];
    constructor(private db: AngularFireDatabase) {
        db.list('/Shot_version').subscribe(
            res => {
                this.shot_versions = res ;
                console.log('refreshed'); 
            },
            err =>{
                console.log('something went wrong')
            }
        )
    }

    ngOnInit() { }

}