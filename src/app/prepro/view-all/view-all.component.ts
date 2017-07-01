import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MaterialModule } from '@angular/material'
import { ProjectService } from '../../shared/cproject.service';
import { Subject } from 'rxjs/Subject'

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

    public assets = [];
    public selectedAsset: any;
    public isAssetOpen: boolean = false;
    public saveTr: any;

    public subject = new Subject();
    constructor(private db: AngularFireDatabase, public cproj: ProjectService, public router: Router, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }




                const obj = db.list('/Project_Asset', {
                    query: {
                        orderByChild: 'project_key',
                        equalTo: cproj.getCurrentProjectId()
                    }
                }).subscribe(res => {
                    res.forEach(pas => {
                        db.list('/Assets', {
                            query: {
                                orderByKey: true,
                                equalTo: pas.asset_key
                            }
                        }).subscribe(res1 => {
                            let flag = false;
                            for (let ass in this.assets) {
                                if (this.assets[ass].$key == res1[0].$key) {
                                    this.assets[ass] = res1[0];
                                    flag = true;
                                }
                            }
                            if (!flag) {
                                this.assets.push(res1[0])
                            }
                            console.log(this.assets);
                            this.assets.forEach(element => {
                                element.isShown = true;
                            });

                        })


                    })
                })

            }
            else {
                this.router.navigate(['/login'])
            }
        })



        //     }).subscribe(
        //         res => {
        //             this.assets = res;
        //             
        //             console.log('refreshed', this.assets);
        //         },
        //         err => {
        //             console.log('something went wrong')
        //         }
        //     )

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