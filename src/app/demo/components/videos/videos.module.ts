import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
//import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VideosRoutingModule,
    HttpClientModule,
  ]
})
export class VideosModule { }
