import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface'
import { AngularFireDatabase } from 'angularfire2/database'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
    selector: 'add-asset-version',
    templateUrl: 'add-version.template.html',
    styles: [`
        .asset-version-form{
            color: white;
        }
        .full-width{
            width:100%;
        }
    `]
})

export class AddAssetVersionComponent implements OnInit {

    public asset_version: AssetVersion;

    constructor(private db: AngularFireDatabase, private ar: ActivatedRoute, private loc: Location) { }

    ngOnInit() { }

    add(form) {
        form.averst = form.averst.valueOf();
        form.averendt = form.averendt.valueOf();
        form.dept_name = this.ar.snapshot.params['dept_name'];
        form.asset_id = this.ar.snapshot.params['id'];
        form.a_d = this.ar.snapshot.params['id'] + '_' + this.ar.snapshot.params['dept_name']
        this.asset_version = form;
        console.log('adding this value : ', form.dept_name, form.asset_id)
        const add = this.db.list('/Asset_version')
        add.push(this.asset_version).then(_ => {
            console.log('Asset version Added')
            this.loc.back();
        })

    }
}