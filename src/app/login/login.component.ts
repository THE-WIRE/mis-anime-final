import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';

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

  constructor(public af: AngularFireAuth, public router: Router) {

    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 100);
  }

  //User login with credentials entered in the login form
  login(data) {
    console.log(data);
    this.af.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(data => {
        this.router.navigate(['app/dashboard']);
      })
      .catch(error => {
        console.log("Error : ", error);
        //TODO : Show error on front end
      })
  }
}
