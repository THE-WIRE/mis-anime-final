import { Component, OnInit } from '@angular/core';
import { ShotVersion } from '../shot-version.interface'
import { AngularFireDatabase } from 'angularfire2/database'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
    selector: 'add-shot-version',
    templateUrl: 'add-version.template.html',
    styles: [`
        .shot-version-form{
            color: white;
        }
        .full-width{
            width:100%;
        }
    `]
})

export class AddShotVersionComponent implements OnInit {

    public shot_version: ShotVersion;

    constructor(private db: AngularFireDatabase, private ar: ActivatedRoute, public router: Router, private loc: Location) {
        //TODO Go to Project/All if project not seletced
    }

    ngOnInit() { }

    add(form) {
        form.sverst = form.sverst.valueOf();
        form.sverendt = form.sverendt.valueOf();
        form.dept_name = this.ar.snapshot.params['dept_name'];
        form.shot_id = this.ar.snapshot.params['shot_id'];
        form.s_d = this.ar.snapshot.params['shot_id'] + '_' + this.ar.snapshot.params['dept_name']
        this.shot_version = form;
        console.log('adding this value : ', form.dept_name, form.shot_id)
        const add = this.db.list('/Shot_version')
        add.push(this.shot_version).then(_ => {
            console.log('Shot version Added')
            this.loc.back();
        })

    }

    cancel() {
        this.loc.back();
    }
}