import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-project',
    templateUrl: 'add-project.template.html',
    styles: [`
        .project-form{
            color: white;
        }
    `]
})

export class AddProjectComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}