import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosRoutingModule } from './videos-routing.module';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UploadVideosComponent } from './upload-videos/upload-videos.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
//import { RouterModule } from '@angular/router';
//import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [UploadVideosComponent,VideoGalleryComponent,VideoPlayerComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    HttpClientModule,
  ]
})
export class VideosModule { }
