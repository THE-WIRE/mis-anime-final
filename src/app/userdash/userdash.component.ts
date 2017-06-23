import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr'


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
  constructor(private notify: ToastrService, private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute) {

    notify.success('title', 'toastr done');
    this.users = db.list('/WorkingTree', { preserveSnapshot: true })
    this.users
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          let snap = snapshot.val()
          const av_stat = firebase.database().ref('/WorkingTree').on('value', function (snaps) {
            console.log(snaps.child.length)
          })

        });
      })

    // this.users = db.list('/WorkingTree');

    // const av = firebase.database().ref('/Asset_version').on('value', function (snapshot) {

    //   console.log(snapshot.numChildren());
    // })

    // const av_stat = firebase.database().ref('/Asset_version').on('value', function (snapshot) {
    //   console.log(snapshot.val());
    //   let snap = snapshot.val()
    //   for (let i in snap) {
    //     console.log(snap[i])


    //   }
    // });


    // const ca = firebase.database().ref('/Asset_version').orderByKey().on("child_added", function (snapshot) {
    //   console.log(snapshot.key);
    //   let snap = snapshot.val()
    //   for (let i in snap) {
    //     console.log(snap[i])
    //     for (let j in snap) {
    //       console.log(snap[j[i]])

    //     }
    //   }
    // })



  }


}
