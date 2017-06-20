import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute } from '@angular/router';


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
  public input: boolean = false
  public ishiden: boolean = false
  public reply: string
  public ishider: boolean = false
  public currentReply: any
  public currentReplyr: any
  public r_note: any[];
  public asset_id: any;
  public asset_verid: any;
  public selectedValue = 'all';
  public filters = [
    { value: 'all', viewValue: 'Show all' }
  ];


  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute) {
    this.asset_id = this.route.snapshot.params['asset_id'];
    db.list('Asset_version', {
      query: {
        orderByChild: 'asset_id',
        equalTo: this.asset_id
      }
    }).subscribe(res => {
      res.forEach(x => {
        this.filters.push({ value: x.$key, viewValue: x.avercode })
      })
    })

    this.show_notes();


  }

  show_notes() {
    if (this.selectedValue == 'all') {
      this.input = false
      this.db.list('/Notes', {
        query: {
          orderByChild: 'asset_id',
          equalTo: this.asset_id
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

    else {
      this.input = true
      this.db.list('/Notes', {
        query: {
          orderByChild: 'asset_ver',
          equalTo: this.asset_id + '_' + this.selectedValue
        }
      }).subscribe(
        res => {
          console.log('check this :' + this.asset_id + '_' + this.selectedValue);
          this.notes = res.sort(this.sortByDate);

          console.log(this.notes);

        },
        err => {
          console.log('something went wrong while retrieving notes');
        })
    }

  }



  add(form) {
    this.note = null
    const ncrtdate = Date.now();

    const nobj = this.db.list('/Notes').push({ "asset_id": this.asset_id, "asset_ver": this.asset_id + '_-Kn2xduZHc6bVbfH6tah', "note": form.note, "crdate": ncrtdate, "crby": this.af.auth.currentUser.uid }).key//.then((item)=>{
    //   console.log('first '+item)
    //   console.log (item.key);
    // } )

    console.log('this is something awesome : ' + nobj)
  }

  add_reply(key, reply) {
    console.log(reply)
    const ncrtdate = Date.now();

    const repobj = this.db.list('/Note_reply').push({ "pnote": key, "note": reply, "crdate": ncrtdate, "crby": this.af.auth.currentUser.uid }).then(_ => {
      console.log('note reply added')
    })

  }

  reply_note(n) {
    this.currentReply = n;
    console.log(this.currentReply)
    this.ishider = true;
    this.show_reply(n)

  }

  show_reply(key) {
    this.ishiden = false;
    this.currentReplyr = key;
    console.log(key)

    const nrobj = this.db.list('/Note_reply', {
      query: {
        orderByChild: 'pnote',
        equalTo: key
      }
    }).subscribe(res => {

      console.log('new show reply   ', res)

      this.notes.forEach(x => {
        //console.log(x.$key, key);
        if (x.$key == key) {
          x.reply = res
        }
      })

      //console.log(note);
    })

    this.ishiden = true;

  }




  sortByDate(n1, n2) {
    return n1.ncrtdate - n2.ncrtdate;
  }

  filtered() {
    console.log('this is selected version  ', this.selectedValue)
    this.show_notes();
  }

}
