import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
  selector: 'another',
  templateUrl: 'another.template.html',
  styles: ['another.style.css']
})
export class AnotherPage {
  public item: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.item = db.list('projects');
    this.item.subscribe(items => {
      console.log(items)
    })
  }
}
