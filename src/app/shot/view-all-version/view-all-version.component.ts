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

    public shot_version: ShotVersion;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}