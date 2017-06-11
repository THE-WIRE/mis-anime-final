import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'shot',
  styleUrls: ['./shot.style.scss'],
  templateUrl: './shot.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'shot-page app'
  }
})
export class Shot {

  constructor() {
    console.log("Omkar");
  }
}
