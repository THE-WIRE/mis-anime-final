import { Component } from '@angular/core';
import { MdCard } from '@angular/material';
import { UserService } from '../shared/cuser.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})
export class Dashboard {
  constructor(public cuser: UserService) {
    console.log(cuser.getCurrentUser());
  }
}
