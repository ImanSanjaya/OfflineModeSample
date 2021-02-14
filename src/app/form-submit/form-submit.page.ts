import { Component, OnInit } from '@angular/core';
import { RestserviceService } from '../api/restservice.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.page.html',
  styleUrls: ['./form-submit.page.scss'],
})
export class FormSubmitPage implements OnInit {

  nama_kategori;
  path_gambar;

  constructor(
    private service: RestserviceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.service.TriggerOnConnection();
  }

  submitForm(){
    
    const data = {
      nama_kategori : this.nama_kategori,
      path_gambar   : this.path_gambar
    };

    if(localStorage.getItem('dataTmpOfflineMode') != null){
      let getDataTmpOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
      localStorage.removeItem('dataTmpOfflineMode'); 

      getDataTmpOfflineMode.forEach(element => {
        const dataTmp = {
          nama_kategori : element.name_category_outlet,
          path_gambar   : element.img_path_category_outlet
        };
        this.service.EngineInsert(dataTmp);
        console.log("Loop Data ==> "+ element.name_category_outlet);
      }); 

    }

    this.service.EngineInsert(data);
 
  }


}
