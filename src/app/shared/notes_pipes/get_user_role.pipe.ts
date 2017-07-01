import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'

@Pipe({
    name: 'getUserRole'
})

export class UserRole implements PipeTransform {
    constructor(private af: AngularFireDatabase) {

    }

    transform(uid: any, pid: any): any {

        return this.af.object('Project_User/' + pid + '_' + uid + '/role').map(res => {
            return res.$value;
        })
    }
}