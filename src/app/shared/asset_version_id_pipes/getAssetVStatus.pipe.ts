import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'stat'
})

export class VersionStatus implements PipeTransform {
    constructor(private af: AngularFireDatabase) { }

    transform(aid: any, ...args: any[]): any {
        console.log('inside Asset vesion status pipe')
        return this.af.object('Asset_version/' + aid + '/status').map(res => {
            return res.$value
        })
    }
}