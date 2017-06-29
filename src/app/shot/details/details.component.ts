import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ProjectService } from '../../shared/cproject.service';
import { NoteShot } from '../../notes/noteshot.component';

@Component({
    selector: 'details-asset',
    templateUrl: 'details.template.html',
    styles: [`
      
    `]
})

export class ShotDetailsComponent implements OnInit {

    public shot: any;
    public selectedIndex: any;
    @ViewChild(NoteShot) public note: NoteShot;
    constructor(private db: AngularFireDatabase, public router: Router, public cproj: ProjectService, public ar: ActivatedRoute, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }

                db.object('/Shots/' + ar.snapshot.params['shot_id']).subscribe(res => {
                    this.shot = res;
                });
            }
            else {
                this.router.navigate(['/login'])
            }
        })
    }

    changeTab(val: any) {
        this.selectedIndex = val.tab;
        this.note.trigger(val.key);
    }

    ngOnInit() { }

}