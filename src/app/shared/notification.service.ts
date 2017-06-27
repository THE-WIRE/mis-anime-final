import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'
import { ToastrService } from 'ngx-toastr'
import { UserService } from "./cuser.service";
import { ProjectService } from './cproject.service'

@Injectable()
export class NotificationService {
    constructor(private cproj: ProjectService, private u: UserService, private toastr: ToastrService, private af: AngularFireDatabase, private au: AngularFireAuth) { }

    add_notification_project_level(type, msg) {
        let obj = {
            notifytype: type,
            notifycrtT: firebase.database.ServerValue.TIMESTAMP,
            notifymsg: msg,
            crtby: this.au.auth.currentUser.uid,
            crtbyType: this.u.user.utype,
            level: this.u.user.level
        }

        this.af.list('/Notifications/' + this.cproj.getCurrentProjectId()).push(obj).then(_ => {
            console.log('notification added !');
            return
        })
    }

    notify() {
        console.log('this is a level : ' + this.u.user.level)
        let this2 = this
        if (this.au.auth.currentUser) {
            let id = this.au.auth.currentUser.uid
            let level = this.u.user.level
            let ref = firebase.database().ref('Notifications')
            let pref = ref.child(this.cproj.getCurrentProjectId());
            pref.orderByChild('level').limitToLast(4).startAt(level).on('child_added', function (data) {
                let newNofify = data.val();
                console.log('this is not what i wanted ' + data.val().notifycrtT);
                if (newNofify.crtby != id) {

                    this2.toastr.success(newNofify.notifymsg, newNofify.notifytype);
                }
            })
        }
    }



}