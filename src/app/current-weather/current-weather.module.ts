import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentComponent } from './current/current.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [CurrentComponent],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class CurrentWeatherModule { }
