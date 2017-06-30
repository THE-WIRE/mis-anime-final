import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'verCode'
})

export class VerCodePipe implements PipeTransform {
    constructor(private af: AngularFireDatabase) { }

    transform(aid: any, ...args: any[]): any {
        return this.af.object('Asset_version/' + aid + '/avercode').map(res => {
            return res.$value
        })
    }
}