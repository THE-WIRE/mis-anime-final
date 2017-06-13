import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
    selector: 'add-shot',
    templateUrl: 'add-shot.template.html',
    styles: [`
        .shot-form{
            color: white;
        },
        .form-horizontal{
            
        },
        .widget{
            color: black;
        }

        .full-width{
            width:100%;
        }
    `]
})

export class AddShotComponent implements OnInit {

    public shot: Shot;

    constructor(private db: AngularFireDatabase) { }

    ngOnInit() { }

    add(form) {
        this.shot = form;
        const add = this.db.list('/Shots');
        add.push(this.shot).then(_ => { console.log('Shot added') })
    }
}