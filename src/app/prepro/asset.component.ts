import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'asset',
  styleUrls: ['./asset.style.scss'],
  templateUrl: './asset.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'asset-page app'
  }
})
export class Asset {

  constructor() {
    console.log("Omkar");
  }
}
