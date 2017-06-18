import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
    selector: 'add-shot-version',
    templateUrl: 'add-version.template.html',
    styles: [`
        .shot-version-form{
            color: white;
        }
        .full-width{
            width:100%;
        }
    `]
})

export class AddShotVersionComponent implements OnInit {

    public shot_version: ShotVersion;

    constructor(private db: AngularFireDatabase) { }

    ngOnInit() { }

    add(form) {
        this.shot_version = form;
        const add = this.db.list('/Shot_version');
        add.push(this.shot_version).then(_ => { console.log('Shot Version Added') })
    }
}