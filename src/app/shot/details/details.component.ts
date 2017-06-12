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

    public shot: Shot;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}