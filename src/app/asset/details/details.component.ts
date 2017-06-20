import { Component, OnInit } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ProjectService } from '../../shared/cproject.service';

@Component({
    selector: 'details-asset',
    templateUrl: 'details.template.html',
    styles: [`
        }
        .view{
            color: white;
    `]
})

export class AssetDetailsComponent implements OnInit {

    public asset: any;
    constructor(private db: AngularFireDatabase, public router: Router, public cproj: ProjectService, public ar: ActivatedRoute) {
        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }

        db.object('/Assets/' + ar.snapshot.params['asset_id']).subscribe(res => {
            this.asset = res;
        });
    }
    ngOnInit() { }

}