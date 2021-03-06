import { Component, Output, ViewChild, OnInit, EventEmitter, ElementRef, NgZone  } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {WeatherDataService} from '../../services/weather-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import {} from 'googlemaps';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  city = true;
  currentUrl = '/current';
  @ViewChild('search') public searchElement: ElementRef;
  @Output() messageEventFromHeader = new EventEmitter<any>();

  constructor(private spinner: NgxSpinnerService, private weatherdataservice: WeatherDataService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private router: Router) {}
requestObj = {
    lat: null,
    lng: null,
    city: '',
    address: '',
    weatherType: '',
    currentTime: new Date().toLocaleTimeString()
};

searchValue = new FormGroup({
  searchText: new FormControl('', Validators.required),
 });

  ngOnInit() {
console.log(this.router.url);
this.currentUrl = this.router.url;
  }

  emitLocationData() {
    this.spinner.show();
    console.log(this.searchValue.value.searchText);
    const searchText = this.searchValue.value.searchText;
    const  matches = searchText.match(/\d+/g);
    if (matches != null) {
      console.log('number');
      this.weatherdataservice.getLatLngByZip(this.searchValue.value.searchText).subscribe(data => {
          console.log(data);
          this.requestObj.lat = data.latt;
          this.requestObj.lng = data.longt;
          this.requestObj.address = data.standard.addresst;
          this.requestObj.city = data.standard.city;
          this.requestObj.weatherType = 'latlng';
          this.messageEventFromHeader.emit(this.requestObj);
           }, error => {
        console.log(error);
        this.spinner.hide();
      });

       } else {
            this.requestObj.city = searchText;
            delete this.requestObj.lat;
            delete this.requestObj.lng;
            delete this.requestObj.address;
            this.requestObj.weatherType = 'city';
            this.messageEventFromHeader.emit(this.requestObj);

    }
  }

}
