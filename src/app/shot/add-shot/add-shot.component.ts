import { Component, OnInit } from '@angular/core';
import { Shot } from '../shot.interface'

@Component({
    selector: 'add-shot',
    templateUrl: 'add-shot.template.html',
    styles: [`
        .shot-form{
            color: white;
        }
    `]
})

export class AddShotComponent implements OnInit {

    public shot: Shot;

    constructor() { }

    ngOnInit() { }
}