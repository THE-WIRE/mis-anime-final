/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

import { ToastrService } from 'ngx-toastr';

import { AngularFireDatabase } from 'angularfire2/database'

import { AngularFireAuth } from 'angularfire2/auth'

import * as firebase from 'firebase'


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss',
    '../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
    '../../node_modules/ngx-toastr/toastr.css'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App {
  constructor(private toastr: ToastrService, private af: AngularFireDatabase, private au: AngularFireAuth) {
    firebase.database().ref('/Notifications').on('child_added', function (data) {
      let newNofify = data.val();
      if (newNofify.crtby != au.auth.currentUser.uid) {
        toastr.success(newNofify.notifymsg, newNofify.notifytype);
      }
    })
  }

}
