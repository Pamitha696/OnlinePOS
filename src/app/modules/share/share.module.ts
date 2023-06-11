import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    ShareComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatSnackBarModule
  ]
})
export class ShareModule { }
