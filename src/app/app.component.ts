/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss',
    '../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App {
}
