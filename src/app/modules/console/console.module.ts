import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { DashboardContextComponent } from './inner-items/dashboard-context/dashboard-context.component';
import { ManageOrderComponent } from './inner-items/dashboard-context/orders/manage-order/manage-order.component';
import { AddOrderComponent } from './inner-items/dashboard-context/orders/manage-order/add-order/add-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    ConsoleComponent,
    DashboardContextComponent,
    ManageOrderComponent,
    AddOrderComponent
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class ConsoleModule { }
