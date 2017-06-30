import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'uname'
})

export class UnamePipe implements PipeTransform {
    public uname: any;
    constructor(private af: AngularFireDatabase) { }

    transform(uid: any, ...args: any[]): any {
        console.log('inside pipe')
        return this.af.object('Users/' + uid + '/username').map(res => {
            return res.$value
        })
    }
}