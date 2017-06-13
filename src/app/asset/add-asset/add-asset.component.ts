import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset.interface'
import {AngularFireDatabase} from 'angularfire2/database'

@Component({
    selector: 'add-asset',
    templateUrl: 'add-asset.template.html',
    styles: [`
        .asset-form{
            color: white;
        }
    `]
})

export class AddAssetComponent implements OnInit {

    public asset: Asset;

    constructor(private db : AngularFireDatabase) { }

    ngOnInit() { }
    
    add(form){
        this.asset = form;
        const add = this.db.list('/Assets');
        add.push(this.asset).then(_ => {console.log('Asset Added')});
  }

  selectedValue: string;

    assets = [
        {value: 'A', viewValue: 'A'},
        {value: 'B', viewValue: 'B'},
        {value: 'C', viewValue: 'C'}
    ];
}