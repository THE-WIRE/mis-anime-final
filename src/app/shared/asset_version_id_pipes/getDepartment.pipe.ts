import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'depName'
})

export class DepNamePipe implements PipeTransform {
    constructor(private af: AngularFireDatabase) { }

    transform(aid: any, ...args: any[]): any {
        console.log('inside Asset pipe')
        return this.af.object('Asset_version/' + aid + '/dept_name').map(res => {
            return res.$value
        })
    }
}