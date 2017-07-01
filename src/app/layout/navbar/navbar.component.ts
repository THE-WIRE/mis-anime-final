import { Component, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { MaterialModule } from "@angular/material";

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html'
})
export class Navbar {
  @Output() changeSidebarPosition = new EventEmitter();
  @Output() changeSidebarDisplay = new EventEmitter();
  @Output() openSidebar = new EventEmitter();

  display: string = 'Left';
  radioModel: string = 'Left';
  searchFormState: boolean = true;
  settings: any = {
    isOpen: false
  };

  constructor(private renderer: Renderer, private el: ElementRef, public af: AngularFireAuth, public router: Router, public db: AngularFireDatabase) { }

  sidebarPosition(position): void {
    this.changeSidebarPosition.emit(position);
  }

  sidebarDisplay(position): void {
    this.changeSidebarDisplay.emit(position);
  }

  sidebarOpen(): void {
    this.openSidebar.emit();
  }

  searchFormOpen(): void {
    if (this.searchFormState) {
      this.changeStyleElement('#search-form', 'height', '40px');
      this.changeStyleElement('.notifications ', 'top', '86px');
    } else {
      this.changeStyleElement('#search-form', 'height', '0px');
      this.changeStyleElement('.notifications ', 'top', '46px');
    }
    this.searchFormState = !this.searchFormState;
  }

  private changeStyleElement(selector, styleName, styleValue): void {
    this.renderer.setElementStyle(this.el.nativeElement
      .querySelector(selector), styleName, styleValue);
  }

  logout() {
    this.db.object('/LoggedIn/' + this.af.auth.currentUser.uid).update({ "status": false })
    this.af.auth.signOut().then(res => {
      this.router.navigate(['/login'])
    })
      .catch(err => {
        console.log(err);
      })
  }
}
