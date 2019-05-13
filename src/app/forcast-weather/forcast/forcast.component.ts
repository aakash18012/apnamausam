import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {

  lat: any = 19.1726;
  lng: any = 72.9425;
  city = 'mumbai';
  Math: any;
  weatherdata1 = {
    name: null,
    main: {
      temp: '',
    },
    sys: {
      country: ''
    },
    weather: [{description: ''}]
  };

  constructor(private weatherdataservice: WeatherDataService) {
    this.Math = Math;
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
      });
    } else {
      this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
    }
  }

  getCurrentWeatherInfo(lat, lng, type) {
    this.weatherdataservice.getWeatherDataBylatLon(lat, lng, 'forcast').subscribe(data => {
        console.log(data);
        this.weatherdata1 = data;
      }
    );
  }
  receiveMessage($event) {
    console.log('from forcast', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'forcast' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;
        }
      );
    } else {
      this.weatherdataservice.getWeatherDataBylatLon(this.lat, this.lng, 'forcast' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;
        }
      );
    }


  }
}