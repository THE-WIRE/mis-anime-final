import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'userdash',
  templateUrl: './userdash.template.html',
  styles: [`
    
  `],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'note-page app'
  }
})
export class UserDashComponent {

  users: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute) {

    this.users = db.list('/WorkingTree');

  }
}
