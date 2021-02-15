import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormScanPage } from './form-scan.page';

const routes: Routes = [
  {
    path: '',
    component: FormScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormScanPageRoutingModule {}
