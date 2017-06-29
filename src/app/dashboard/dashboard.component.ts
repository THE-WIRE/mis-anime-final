import { Component } from '@angular/core';
import { MdCard } from '@angular/material';
import { UserService } from '../shared/cuser.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})
export class Dashboard {
  constructor(public cuser: UserService, public router: Router, public af: AngularFireAuth) {
    this.af.authState.subscribe(res => {
      if (res) {
        console.log(cuser.getCurrentUser());
      }
      else {
        this.router.navigate(['/login']);
      }
    })

  }
}
