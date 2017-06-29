import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../asset.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'
import { ProjectService } from '../../shared/cproject.service';
import { AngularFireAuth } from "angularfire2/auth";
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

export class ViewAllShotComponent implements OnInit {

    public shots = [];
    public selectedShot: any;
    public isshotOpen: boolean = false;
    public saveTr: any;

    public subject = new Subject();
    constructor(private db: AngularFireDatabase, public cproj: ProjectService, public router: Router, public af: AngularFireAuth) {
        this.af.authState.subscribe(res => {
            if (res) {
                if (!cproj.getCurrentProjectId()) {
                    router.navigate(['/project/all']);
                }

                const obj = db.list('/Project_Shot', {
                    query: {
                        orderByChild: 'project_key',
                        equalTo: cproj.getCurrentProjectId()
                    }
                }).subscribe(res => {
                    res.forEach(pas => {
                        db.list('/Shots', {
                            query: {
                                orderByKey: true,
                                equalTo: pas.shot_key
                            }
                        }).subscribe(res1 => {
                            let flag = false;
                            for (let ass in this.shots) {
                                if (this.shots[ass].$key == res1[0].$key) {
                                    this.shots[ass] = res1[0];
                                    flag = true;
                                }
                            }
                            if (!flag) {
                                this.shots.push(res1[0])
                            }
                            console.log(this.shots);
                            this.shots.forEach(element => {
                                element.isShown = true;
                            });

                        })


                    })
                })



            }
            else {
                this.router.navigate(['/login']);
            }
        })


        //     }).subscribe(
        //         res => {
        //             this.shots = res;
        //             
        //             console.log('refreshed', this.shots);
        //         },
        //         err => {
        //             console.log('something went wrong')
        //         }
        //     )

    }

    explore(key) {
        this.shots.forEach(x => {
            if (x.$key == key) {
                x.isShown = false;
            }
        })
    }

    close(key) {
        this.shots.forEach(x => {
            if (x.$key == key) {
                x.isShown = true;
            }
        })
    }

    ngOnInit() { }

}