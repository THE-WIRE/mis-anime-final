import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'


@Pipe({
    name: 'projName'
})

export class ProjNamePipe implements PipeTransform {
    constructor(private af: AngularFireDatabase) { }

    transform(aid: any, args): any {
        let uid = args;
        console.log('this is uid:' + uid);
        return this.af.object('Asset_version/' + aid + '/asset_id').map(res => {
            return this.af.list('Project_Asset', {
                query: {
                    orderByChild: 'asset_key',
                    equalTo: res.$value
                }
            }).map(res1 => {
                return this.af.object('Project_User/' + res1[0].project_key + '_' + uid + '/role').map(res2 => {
                    console.log('this is a role :' + res2.$value)
                    return this.af.object('Projects/' + res1[0].project_key + '/pname').map(res3 => {
                        return res3.$value + ' (' + res2.$value + ') '
                    })
                })
            })
        })
    }
}