import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'


@Component({
  selector: 'note',
  templateUrl: './note.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'note-page app'
  }
})
export class Note {

      public note : any
      public notes : any[] 
      constructor( private db : AngularFireDatabase ){
          db.list('/Notes',{
            query : {
              orderByChild : 'ncrtdate',
              limitToLast : 100
            }
          }).subscribe(
              res =>{
                  this.notes = res.sort(this.sortByDate);
                  console.log(this.notes);

              },
              err =>{
                  console.log('something went wrong while retrieving notes');
              })
      }


      add(form){
        this.note = null 
        const ncrtdate = Date.now();
        const nobj = this.db.list('/Notes').push({"note" : form.note , "ncrtdate" : ncrtdate}).key//.then((item)=>{
        //   console.log('first '+item)
        //   console.log (item.key);
        // } )

        console.log('this is something awesome : '+nobj)
      }

      
    sortByDate(n1,n2){
        return n2.ncrtdate - n1.ncrtdate;
    }

      
 }
