import { Component } from '@angular/core';
import { RestserviceService } from '../api/restservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myData            : any;
  myDataOfflineMode : any;

  constructor(
    private service: RestserviceService
  ) {}

  ngOnInit() {
    this.loadDataRestApi();
    this.service.TriggerOnConnection();
    // localStorage.removeItem('dataTmpOfflineMode');
    // localStorage.setItem('dataTmpOfflineMode', '[]');
    // this.myData = JSON.parse(localStorage.getItem('dataTmp'));
  }

  ionViewWillEnter(){
    this.loadDataRestApi();
    this.service.TriggerOnConnection();
  }

  loadDataRestApi(){
    this.service.getData().subscribe( (data:any[]) =>{
      // console.log('Data Saya ===>'+JSON.stringify(data['category']));
      localStorage.setItem('dataTmp', JSON.stringify(data['category']));
      this.myData = JSON.parse(localStorage.getItem('dataTmp'));
      this.myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
    },
    err => {
      this.myData = JSON.parse(localStorage.getItem('dataTmp'));
      this.myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
      console.log(' <== Offline Mode ==> '+ this.myDataOfflineMode);
    });
  }

}
