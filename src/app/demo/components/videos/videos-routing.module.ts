import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideosComponent } from './upload-videos/upload-videos.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';

const routes: Routes = [
  { path: 'upload', component: UploadVideosComponent },
  { path: 'player/:id', component: VideoPlayerComponent },
  { path: 'gallery', component: VideoGalleryComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
