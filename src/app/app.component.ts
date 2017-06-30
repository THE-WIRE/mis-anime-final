/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
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

  constructor(private notify: NotificationService, private pro: ProjectService, private toastr: ToastrService, private db: AngularFireDatabase, private au: AngularFireAuth, public c: CookieService, public router: Router) {
    pro.ev$.subscribe(item => {
      this.notify.notify();
    })

    firebase.auth().onAuthStateChanged(user => {
      console.log('Auth status changed!');
      if (user) {
        this.db.object('/LoggedIn/' + user.uid).update({ "status": true })
        //Load cookie values if already exist or load from db
        if (!this.c.getObject(user.uid + 'user')) {
          //load user data
          console.log('Loading User data...');
          this.db.object('/Users/' + user.uid).subscribe(x => {
            x.uid = user.uid
            this.c.putObject(user.uid + 'user', x)
            console.log('User data loaded!');

          })

        }
        if (!this.c.getObject(user.uid + 'projects')) {

          //load projects
          console.log('Loading Projects data...');
          this.db.list('/Project_User/', {
            query: {
              orderByChild: 'uid',
              equalTo: user.uid
            }
          }).subscribe(projects => {
            this.c.putObject(user.uid + 'projects', projects)
            console.log('Project data loaded!', projects);
          })
        }
        if (!this.c.getObject(user.uid + 'project')) {
          this.router.navigate(['/project/all']);
        }
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }
}
