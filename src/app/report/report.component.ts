import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { Router } from '@angular/router';
import * as firebase from 'firebase'

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
  public uid = "cu0uoPgZzvSwfG6qE6sh4R6Tp1d2";
  public areAssets: boolean = false;
  public nAssets: any;
  public nProjects: any;
  public online: boolean

  constructor(private af: AngularFireDatabase) {
    console.log("inside reports");
    let this2 = this
    firebase.database().ref('Version_User_Stats').orderByChild('uid').equalTo(this2.uid).on('value', function (res) {
      this2.nAssets = res.numChildren();
    })

    af.object('LoggedIn/' + this.uid + '/status').subscribe(res => {
      this.online = res.$value;
    })

    firebase.database().ref('Project_User').orderByChild('uid').equalTo(this2.uid).on('value', function (res) {
      this2.nProjects = res.numChildren();
    })


  }

  showAssets() {
    //this.uid = "cu0uoPgZzvSwfG6qE6sh4R6Tp1d2";
    this.areAssets = !this.areAssets;
  }
}
