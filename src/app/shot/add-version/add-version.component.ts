import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'

@Component({
    selector: 'add-shot-version',
    templateUrl: 'add-version.template.html',
    styles: [`
        .shot-version-form{
            color: white;
        }
    `]
})

export class AddShotVersionComponent implements OnInit {

    public shot_version: ShotVersion;

    constructor() { }

    ngOnInit() { }
}