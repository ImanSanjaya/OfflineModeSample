import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormScanPageRoutingModule } from './form-scan-routing.module';

import { FormScanPage } from './form-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormScanPageRoutingModule
  ],
  declarations: [FormScanPage]
})
export class FormScanPageModule {}
