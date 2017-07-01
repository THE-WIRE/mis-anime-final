import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from "@angular/http";

@Component({
  selector: 'another',
  templateUrl: 'another.template.html',
  styles: ['another.style.css']
})
export class AnotherPage {
  public item: FirebaseListObservable<any[]>;

  public department = {
    "dname": "edit",
    "type": "shot production",
    "sform": "shpro"
  }


  constructor(public db: AngularFireDatabase, public http: Http) {
    // db.list('/Departments').push(this.department).then(_=>{
    //     console.log('department pushed')

    http.get('//freegeoip.net/json/').map(x => {
      let body = x.json();
      return body || {};
    }).subscribe(m => {
      console.log(JSON.parse(JSON.stringify(m)));
      console.log(m);
    })

  }

}
