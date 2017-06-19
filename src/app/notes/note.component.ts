import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'note',
  templateUrl: './note.template.html',
  styles: [`
    .note-card{
      margin: 10px;
    }
    .note-card-reply{
      margin: 10px;
      background: #fff888;
    }
    .hide{
      hide : true 
    }
  `],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'note-page app'
  }
})
export class Note {

  public note: any
  public notes: any[]
  public ishiden : boolean = false
  public reply : string
  public ishider : boolean = false
  public currentReply :any
  public currentReplyr :any
  public r_note : any[];


  constructor(private db: AngularFireDatabase , private af : AngularFireAuth) {
    db.list('/Notes', {
      query: {
        orderByChild: 'ncrtdate',
        limitToLast: 100
      }
    }).subscribe(
      res => {
        this.notes = res.sort(this.sortByDate);

        console.log(this.notes);

      },
      err => {
        console.log('something went wrong while retrieving notes');
      })
  }


  add(form) {
    this.note = null
    const ncrtdate = Date.now();
    
    const nobj = this.db.list('/Notes').push({ "note": form.note, "crdate": ncrtdate ,"crby":this.af.auth.currentUser.uid }).key//.then((item)=>{
    //   console.log('first '+item)
    //   console.log (item.key);
    // } )

    console.log('this is something awesome : ' + nobj)
  }

  add_reply(key,reply){
    console.log(reply)
     const ncrtdate = Date.now();
     
       const repobj = this.db.list('/Note_reply').push({"pnote":key,"note":reply ,"crdate" : ncrtdate , "crby": this.af.auth.currentUser.uid}).then(_=>{
         console.log('note reply added')
       })
     
  }

  reply_note(n){
    this.currentReply = n ;
    console.log(this.currentReply)
    this.ishider = true;
    this.show_reply(n)
    
  }

  show_reply(key){
    this.ishiden = false;
    this.currentReplyr = key ;
    console.log(key)

      const nrobj = this.db.list('/Note_reply',{
        query:{
          orderByChild : 'pnote',
          equalTo : key
        }
      }).subscribe(res =>{

        console.log('new show reply   ',res)
        
        this.notes.forEach(x => {
          //console.log(x.$key, key);
          if(x.$key == key){
             x.reply = res
          }
        })

        //console.log(note);
      })

      this.ishiden = true;
      
  }

  


  sortByDate(n1, n2) {
    return n2.ncrtdate - n1.ncrtdate;
  }


}
