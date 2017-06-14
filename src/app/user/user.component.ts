import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
  selector: 'user',
  styleUrls: ['./user.style.scss'],
  templateUrl: './user.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'user-page app'
  }
})
export class User {
  constructor() {
    console.log("Omkar");
  }
}
