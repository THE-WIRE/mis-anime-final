import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdInputContainer, MdCard, MdCardActions } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs'


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
  public ishiden: boolean = false
  public reply: string
  public ishider: boolean = false
  public currentReply: any
  public currentReplyr: any
  public r_note: any[];
  public asset_id: any;
  public asset_verid: any;
  public selectedValue = 'all';
  public dept_name: any
  public noteValue = null
  public currentVersion: string = null;
  public filters = [
    { value: 'all', viewValue: 'Show all' }
  ];
  public statusC: any
  public status = [
    { value: 0, viewValue: "Awaiting Inventory" },
    { value: 1, viewValue: "Inventory" },
    { value: 2, viewValue: "WIP" },
    { value: -1, viewValue: "Paused WIP" },
    { value: 3, viewValue: "Done" },
    { value: 4, viewValue: "Sent for Review" },
    { value: 5, viewValue: "Delivery" },
    { value: 6, viewValue: "Retake" },
    { value: 7, viewValue: "Approved" },
    { value: 8, viewValue: "Revised Move Forward" },
    { value: 9, viewValue: "Unapproved" },
    { value: 10, viewValue: "On Hold" },
    { value: 11, viewValue: "Out of Picture" }
  ];

  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, private route: ActivatedRoute, public router: Router) {
    this.af.authState.subscribe(res => {
      if (res) {
        this.asset_id = this.route.snapshot.params['asset_id'];
        this.dept_name = this.route.snapshot.params['dept_name']

        db.list('Asset_version', {
          query: {
            orderByChild: 'a_d',
            equalTo: this.asset_id + '_' + this.dept_name
          }
        }).subscribe(res => {
          this.filters = [
            { value: 'all', viewValue: 'Show all' }
          ];
          res.forEach(x => {
            if (x.currentVer == true) {
              this.currentVersion = x.$key;
            }
            this.filters.push({ value: x.$key, viewValue: x.avercode })
            // res.forEach(x => {

            // })
          })
        })

        this.show_notes();
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }

  show_notes() {
    this.notes = null;
    if (this.selectedValue == 'all') {
      this.db.list('/Notes', {
        query: {
          orderByChild: 'asset_dept',
          equalTo: this.asset_id + '_' + this.dept_name
        }
      }).map(res1 => {
        res1.forEach(x => {
          x.show = false;
        })

        return res1

      }).subscribe(
        res => {
          this.notes = res.sort(this.sortByDate);

          console.log('this are notes', this.notes);

        },
        err => {
          console.log('something went wrong while retrieving notes');
        })
    }
    else {
      this.notes = null;
      this.db.list('/Notes', {
        query: {
          orderByChild: 'asset_dept_ver',
          equalTo: this.asset_id + '_' + this.dept_name + '_' + this.selectedValue
        }
      }).subscribe(
        res => {
          console.log('check this :' + this.asset_id + '_' + this.selectedValue);
          this.notes = res.sort(this.sortByDate);

          console.log(this.selectedValue, this.notes);

        },
        err => {
          console.log('something went wrong while retrieving notes');
        })
    }

  }


  add(form) {
    this.note = null
    const ncrtdate = Date.now();

    const nobj = this.db.list('/Notes').push({ "asset_id": this.asset_id, "dept_name": this.dept_name, "asset_dept": this.asset_id + '_' + this.dept_name, "asset_dept_ver": this.asset_id + '_' + this.dept_name + '_' + this.currentVersion, "note": form.note, "crdate": ncrtdate, "crby": this.af.auth.currentUser.uid, "checked": false, "assetver_id": this.currentVersion }).then((item) => {
      //   console.log('first '+item)
      //   console.log (item.key);
      this.note = null;
    })

    console.log('this is something awesome : ' + nobj)
  }

  add_reply(key, reply) {
    console.log(reply)
    const ncrtdate = Date.now();

    const repobj = this.db.list('/Note_reply').push({ "pnote": key, "note": reply, "crdate": ncrtdate, "crby": this.af.auth.currentUser.uid, "checked": false, "asstver_id": this.currentVersion }).then(_ => {
      console.log('note reply added')
    })

  }

  reply_note(n) {
    this.currentReply = n;
    console.log(this.currentReply)
    this.ishider = true;
    this.show_reply(n, false)

  }

  show_reply(key, value) {
    for (let i in this.notes) {
      if (this.notes[i].$key == key) {
        this.notes[i].show = !value
      }
    }
    console.log(key)
    if (!value) {
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
            x.reply = res.sort(this.sortByDate);
          }
        })

        //console.log(note);
      })
    }


  }

  checkNote(key, value) {
    this.db.object('Notes/' + key).update({ "checked": !value }).then(x => {
      console.log('value updated');
    }).catch(err => {
      console.log(err);
    })
  }

  checkNoteR(key, value) {
    this.db.object('Note_reply/' + key).update({ "checked": !value }).then(x => {
      console.log('value updated');
    }).catch(err => {
      console.log(err);
    })
  }

  sortByDate(n1, n2) {
    return n2.crdate - n1.crdate;
  }

  filtered() {
    console.log('this is selected version  ', this.selectedValue)
    this.show_notes();
  }

  trigger(key) {
    this.selectedValue = key;
    this.show_notes();
  }

  changeVerStatus() {
    this.db.object('Asset_version/' + this.currentVersion).update({ 'status': this.statusC }).then(res => {
      console.log('status updated');
    })
  }

}
