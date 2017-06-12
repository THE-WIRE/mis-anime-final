import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database'

@Component({
  selector: 'project',
  styleUrls: ['./project.style.scss'],
  templateUrl: './project.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'project-page app'
  }
})
export class Project {
  constructor() {
    console.log("Omkar");
  }
}
