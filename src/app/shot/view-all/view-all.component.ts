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

    public shot: Shot;
    constructor(private db: AngularFireDatabase) {
    }

    ngOnInit() { }

}