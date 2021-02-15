import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { RestserviceService } from '../api/restservice.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-scan',
  templateUrl: './form-scan.page.html',
  styleUrls: ['./form-scan.page.scss'],
  providers: [NFC, Ndef]
})
export class FormScanPage implements OnInit {

  nama_kategori;
  path_gambar;

  constructor(
    private nfc: NFC, private ndef: Ndef,
    private service: RestserviceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.service.TriggerOnConnection();
    this.addListenNFC();
  }

  addListenNFC(){
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;

    this.nfc.readerMode(flags).subscribe(
      tag => {
        let tagId = this.nfc.bytesToHexString(tag.id);
        this.submitScanForm(tagId);
      },
      err => console.log(err)
    )
  }

  submitScanForm(tagId){
    
    const data = {
      nama_kategori : tagId,
      path_gambar   : "Scan NFC"
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
