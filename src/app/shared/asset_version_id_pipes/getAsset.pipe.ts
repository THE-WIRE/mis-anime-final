import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'assetCode'
})

export class AssetPipe implements PipeTransform {
    constructor(private af: AngularFireDatabase) { }

    transform(aid: any, ...args: any[]): any {
        console.log('inside Asset pipe')
        return this.af.object('Asset_version/' + aid + '/asset_id').map(res => {
            return this.af.object('Assets/' + res.$value + '/acode').map(res1 => {
                return res1.$value;
            })
        })
    }
}