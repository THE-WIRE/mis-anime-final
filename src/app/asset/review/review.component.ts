import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ProjectService } from '../../shared/cproject.service';
import { Subject } from 'rxjs';
import { Note } from '../../notes/note.component';

@Component({
    selector: 'review-asset',
    templateUrl: 'review.template.html',
    styles: [`
      .size{
        font-size : 0.5rem
       }
    `]
})

export class ReviewAssetVersionComponent implements OnInit {

    public asset: any;
    public selectedIndex: any;
    @ViewChild(Note) private note: Note;

    constructor(private db: AngularFireDatabase, public router: Router, public cproj: ProjectService, public ar: ActivatedRoute, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }

                db.object('/Assets/' + ar.snapshot.params['asset_id']).subscribe(res => {
                    this.asset = res;
                });
            }
            else {
                this.router.navigate(['/login'])
            }
        })

    }

    changeTab(val: any) {
        console.log(val)
        this.selectedIndex = val.tab;
        this.note.trigger(val.key);
    }

    ngOnInit() {
    }

}