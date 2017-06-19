import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../asset.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProjectService } from '../../shared/cproject.service';


@Component({
    selector: 'add-asset',
    templateUrl: 'add-asset.template.html',
    styles: [`
        .asset-form{
            color: white;
        }
        .full-width{
            width:100%;
        }
    `]
})

export class AddAssetComponent implements OnInit {

    public asset: Asset;

    constructor(private db: AngularFireDatabase, public af: AngularFireAuth, public cproj: ProjectService, public router: Router) {
        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }
        console.log(cproj.getCurrentProjectId());
    }

    ngOnInit() { }

    add(form) {
        form.crby = this.af.auth.currentUser.uid;
        form.ast = form.ast.valueOf();
        form.aendt = form.aendt.valueOf();
        this.asset = form;
        const add = this.db.list('/Assets');
        const add_project_asset = this.db.list('/Project_Asset/');

        add.push(this.asset).then(_ => { add_project_asset.push({ "asset_key": _.key, "project_key": this.cproj.getCurrentProjectId() }) });

    }

    selectedValue: string;

    assets = [
        { value: 'char', viewValue: 'Character' },
        { value: 'prop', viewValue: 'Prop' },
        { value: 'set', viewValue: 'Set' }
    ];
}