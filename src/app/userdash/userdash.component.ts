import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'userdash',
  templateUrl: './userdash.template.html',
  styles: [`
     .mat-card
{
    content: " " !important;
    display: block !important;
    margin-left: 10px;
}
    
  `],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'note-page app'
  }
})
export class UserDashComponent {


  users: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute) {

    const cnt = firebase.database().ref('/WorkingTree').on('value', function (snapshot) {

      console.log(snapshot.numChildren());
    })
    this.users = db.list('/WorkingTree');

  }


}
