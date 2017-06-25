import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { UserService } from '../shared/cuser.service';
import * as firebase from 'firebase';

@Component({
  selector: 'login',
  styleUrls: ['./login.style.scss'],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {

  public date: any;

  constructor(public af: AngularFireAuth, public router: Router, public db: AngularFireDatabase, public cuser: UserService) {

    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 100);
  }

  //User login with credentials entered in the login form
  login(data) {
    console.log(data);
    data.email = data.email + '@the-wire.com';
    this.af.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(data => {
        //load user data
        console.log('Loading User data...');
        this.db.object('/Users/' + this.af.auth.currentUser.uid).subscribe(user => {
          user.uid = this.af.auth.currentUser.uid;
          this.cuser.loadUser(user);
          console.log('User data loaded!');
          //load projects
          console.log('Loading Projects data...');
          this.db.list('/Project_User/', {
            query: {
              orderByChild: 'uid',
              equalTo: this.af.auth.currentUser.uid
            }
          }).subscribe(res => {
            this.cuser.loadProjects(res);
            console.log('Project data loaded!');
            this.router.navigate(['app/dashboard']);
          })
        })

      })
      .catch(error => {
        console.log("Error : ", error);
        //TODO : Show error on front end
      })
  }
}
