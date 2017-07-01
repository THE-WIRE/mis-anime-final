import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonsModule, DropdownModule } from 'ng2-bootstrap';

import { ROUTES } from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';
import { EmptyLinkModule } from './directives/empty-link/empty-link.module';

import { MaterialModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ROUTES,
    FormsModule,
    ButtonsModule.forRoot(),
    DropdownModule.forRoot(),
    EmptyLinkModule
  ],
  declarations: [Layout, Sidebar, Navbar]
})
export class LayoutModule {
}
