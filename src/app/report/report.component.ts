import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'report',
  styleUrls: ['./report.style.scss'],
  templateUrl: './report.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'report-page app'
  }
})
export class Report {

  constructor() {
    console.log("Omkar");
  }
}
