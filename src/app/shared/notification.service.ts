import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class NotificationService {
    constructor(private af: AngularFireDatabase, private au: AngularFireAuth) { }

    add_notification(type, msg) {
        let obj = {
            notifytype: type,
            notifycrtT: firebase.database.ServerValue.TIMESTAMP,
            notifymsg: msg,
            crtby: this.au.auth.currentUser.uid
        }

        this.af.list('/Notifications').push(obj).then(_ => {
            console.log('notification added !');
            return
        })
    }

}