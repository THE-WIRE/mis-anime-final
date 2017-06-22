import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AssetVersion } from '../asset-version.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ProjectService } from '../../shared/cproject.service';
import { Subject } from 'rxjs';
import { Note } from '../../notes/note.component';

@Component({
    selector: 'details-asset',
    templateUrl: 'details.template.html',
    styles: [`
      
    `]
})

export class AssetDetailsComponent implements OnInit {

    public asset: any;
    public selectedIndex: any;
    @ViewChild(Note) private note: Note;

    constructor(private db: AngularFireDatabase, public router: Router, public cproj: ProjectService, public ar: ActivatedRoute) {
        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }

        db.object('/Assets/' + ar.snapshot.params['asset_id']).subscribe(res => {
            this.asset = res;
        });
    }

    changeTab(val: any) {
        console.log(val)
        this.selectedIndex = val.tab;
        this.note.trigger(val.key);
    }

    ngOnInit() {
    }

}