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
      
    `]
})

export class ShotDetailsComponent implements OnInit {

    public shot: any;
    public selectedIndex: any;
    constructor(private db: AngularFireDatabase, public router: Router, public cproj: ProjectService, public ar: ActivatedRoute) {
        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }

        db.object('/Shots/' + ar.snapshot.params['shot_id']).subscribe(res => {
            this.shot = res;
        });
    }

    changeTab(val: number) {
        console.log(val)
        this.selectedIndex = val;
    }

    ngOnInit() { }

}