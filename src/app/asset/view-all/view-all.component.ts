import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'
import { ProjectService } from '../../shared/cproject.service';


@Component({
    selector: 'view-all-asset',
    templateUrl: 'view-all.template.html',
    styles: [`
        .view{
            color: white;
        }
    `]
})

export class ViewAllAssetComponent implements OnInit {

    public assets: any;
    public selectedAsset: any;
    public isAssetOpen: boolean = false;
    public saveTr: any;
    constructor(private db: AngularFireDatabase, public cproj: ProjectService, public router: Router) {

        if (!cproj.getCurrentProjectId()) {
            router.navigate(['/project/all']);
        }

        db.list('/Assets').subscribe(
            res => {
                this.assets = res;
                this.assets.forEach(element => {
                    element.isShown = true;
                });

                console.log('refreshed', this.assets);
            },
            err => {
                console.log('something went wrong')
            }
        )

    }

    explore(key) {
        this.assets.forEach(x => {
            if (x.$key == key) {
                x.isShown = false;
            }
        })
    }

    close(key) {
        this.assets.forEach(x => {
            if (x.$key == key) {
                x.isShown = true;
            }
        })
    }

    ngOnInit() { }

}