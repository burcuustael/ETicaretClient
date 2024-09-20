import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CustomerComponent }]),
  ],
})
export class CustomerModule {}
