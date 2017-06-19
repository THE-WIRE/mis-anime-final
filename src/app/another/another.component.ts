import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

@Component({
  selector: 'another',
  templateUrl: 'another.template.html',
  styles: ['another.style.css']
})
export class AnotherPage {
  public item: FirebaseListObservable<any[]>;

  public department = {
    "dname" : "edit",
    "type"  : "shot production",
    "sform" : "shpro"
  }


  constructor(public db: AngularFireDatabase) {
    db.list('/Departments').push(this.department).then(_=>{
        console.log('department pushed')
    });
    
  }
}
