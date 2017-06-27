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
  constructor(private toastr: ToastrService, private db: AngularFireDatabase, private au: AngularFireAuth, public c: CookieService, public router: Router) {

    if (au.auth.currentUser) {
      firebase.database().ref('/Notifications').on('child_added', function (data) {
        let newNofify = data.val();

        if (newNofify.crtby != au.auth.currentUser.uid) {
          toastr.success(newNofify.notifymsg, newNofify.notifytype);
        }
      })
    }

    firebase.auth().onAuthStateChanged(user => {
      console.log('Auth status changed!');
      if (user) {
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
        else if (!this.c.getObject(user.uid + 'projects')) {

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
        else if (!this.c.getObject(user.uid + 'project')) {
          this.router.navigate(['/project/all']);
        }
      }
    })
  }
}
