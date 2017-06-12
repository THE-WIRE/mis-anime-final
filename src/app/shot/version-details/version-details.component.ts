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

    public shot_version: ShotVersion;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}