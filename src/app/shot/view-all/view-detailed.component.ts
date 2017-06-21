import { Component, OnInit, Input } from '@angular/core';
import { Shot } from '../shot.interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterialModule } from '@angular/material'

@Component({
    selector: 'view-detailed-shot',
    templateUrl: 'view-detailed.template.html',
    styles: [`
        .view{
            color: white;
        }
        table {
            color: white;
        }
        .off {
            cursor : pointer;
           
        }

        
    `]
})

export class ViewDetailedShotComponent implements OnInit {

    @Input() selectedShot: any;
    public departments: any;
    constructor(private db: AngularFireDatabase) {

    }


    ngOnInit() {

        const obj = this.db.list('/Departments', {
            query: {
                orderByChild: 'type',
                equalTo: "shot production"
            }
        }).subscribe(res => {
            console.log(res)
            this.departments = res
        })


    }

}