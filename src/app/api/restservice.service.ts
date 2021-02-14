import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getData(){
    return this.http.get<any>(environment.api + '/customer/GetListCategory', {});
  }

  public addData(data){
    return this.http.post(environment.api + "/customer/AddDataCategory", 
    {
      'name_category_outlet': data.nama_kategori, 
      'img_path_category_outlet': data.path_gambar
    },
    {headers:new HttpHeaders(
      {"content-Type":"application/json"}
    )});
  }

  public TriggerOnConnection(){

    this.getData().subscribe( res => {
      
      if(localStorage.getItem('dataTmpOfflineMode') != null){
        let getDataTmpOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
        localStorage.removeItem('dataTmpOfflineMode'); 
  
        getDataTmpOfflineMode.forEach(element => {
          const dataTmp = {
            nama_kategori : element.name_category_outlet,
            path_gambar   : element.img_path_category_outlet
          };
          this.EngineInsertTrigger(dataTmp);
        }); 
      }

    });
    
  }

  public EngineInsert(data){
    this.addData(data).subscribe( res => {
        if(res['error'] == false){
          console.log("Success ==> "+ JSON.stringify(res));
          this.router.navigateByUrl('/');  
        } else{
          console.log("Fail ==> "+ JSON.stringify(res));
          this.router.navigateByUrl('/');  
        }
      },
      err => {

        let myDataOfflineMode;

        if(localStorage.getItem('dataTmpOfflineMode') != null){

          myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));

          myDataOfflineMode.push({
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          });

          console.log(' <== Insert By Offline Mode Ketika ada Data Offline lalu di tambah ==> '+JSON.stringify(myDataOfflineMode));
        
        }else{

          myDataOfflineMode = [{
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          }];

        }
        
        localStorage.setItem('dataTmpOfflineMode', JSON.stringify(myDataOfflineMode));
        console.log(' <== Insert By Offline Mode ==> '+myDataOfflineMode);
        this.router.navigateByUrl('/');  
      }
    );
  }

  public EngineInsertTrigger(data){
    this.addData(data).subscribe( res => {
        if(res['error'] == false){
          console.log("Success ==> "+ JSON.stringify(res));
        } else{
          console.log("Fail ==> "+ JSON.stringify(res));
        }
      },
      err => {

        let myDataOfflineMode;

        if(localStorage.getItem('dataTmpOfflineMode') != null){

          myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));

          myDataOfflineMode.push({
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          });

          console.log(' <== Insert By Offline Mode Ketika ada Data Offline lalu di tambah ==> '+JSON.stringify(myDataOfflineMode));
        
        }else{

          myDataOfflineMode = [{
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          }];

        }
        
        localStorage.setItem('dataTmpOfflineMode', JSON.stringify(myDataOfflineMode));
        console.log(' <== Insert By Offline Mode ==> '+myDataOfflineMode);
        this.router.navigateByUrl('/');  
      }
    );
  }

}
