/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

import { ToastrService } from 'ngx-toastr';

import { AngularFireDatabase } from 'angularfire2/database'

import { AngularFireAuth } from 'angularfire2/auth'

import * as firebase from 'firebase'

import { ProjectService } from './shared/cproject.service'

import { NotificationService } from './shared/notification.service'

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
  constructor(private notify: NotificationService, private pro: ProjectService, private toastr: ToastrService, private af: AngularFireDatabase, private au: AngularFireAuth) {
    pro.ev$.subscribe(item => {
      this.notify.notify();
    })

  }
  fun() {
    console.log('event triggered in app.component')
  }

}
