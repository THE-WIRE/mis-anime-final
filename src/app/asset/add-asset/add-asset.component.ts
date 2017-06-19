import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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

    constructor(private db: AngularFireDatabase, public af: AngularFireAuth, public cproj: ProjectService) {
        console.log(cproj.getCurrentProjectId());
    }

    ngOnInit() { }

    add(form) {
        form.crby = this.af.auth.currentUser.uid;
        form.ast = form.ast.valueOf();
        form.aendt = form.aendt.valueOf();
        this.asset = form;
        const add = this.db.list('/Assets');
        const add_project_asset = this.db.object('/Project_Asset/' + this.cproj.getCurrentProjectId());

        add.push(this.asset).then(_ => { add_project_asset.set({ "asset_key": _.key }) });

    }

    selectedValue: string;

    assets = [
        { value: 'A', viewValue: 'A' },
        { value: 'B', viewValue: 'B' },
        { value: 'C', viewValue: 'C' }
    ];
}