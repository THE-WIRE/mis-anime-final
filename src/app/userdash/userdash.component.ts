import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
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
  public t_users: any;
  public o_users: any;
  public w_users: any;
  constructor(private notify: ToastrService, private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute, public router: Router) {

    this.af.authState.subscribe(res => {
      if (res) {
        notify.success('title', 'toastr done');
        this.users = db.list('/WorkingTree')
        // this.users
        //   .subscribe(snapshots => {
        //     snapshots.forEach(snapshot => {
        //       console.log(snapshot.key)
        //       let snap = snapshot.val()
        //       const av_stat = firebase.database().ref('/WorkingTree').on('value', function (snaps) {
        //         console.log(snaps.child.length)
        //       })

        //     });
        //   })

        this.users.subscribe(res => {
          this.t_users = 0;
          this.w_users = 0;
          res.forEach(x => {
            if (x.Task.status == 2) {
              this.w_users++;
              this.t_users++;
            }
            else {
              this.t_users++;
            }
          })
        })

        this.db.list('/LoggedIn').subscribe(user => {
          this.o_users = -1;
          user.forEach(u => {
            if (u.status) {
              this.o_users++;
            }
          })

        })

      }
      else {
        this.router.navigate(['/login']);
      }
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
