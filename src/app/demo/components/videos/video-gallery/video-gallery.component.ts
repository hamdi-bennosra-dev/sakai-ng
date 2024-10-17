import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/layout/service/data.service';
import { VideoMetadataRepresentation } from 'src/app/layout/service/data.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  videos: VideoMetadataRepresentation[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  getPreviewUrl(id: number): string {
    return `http://localhost:8080/v1/video/preview/${id}`;
  } 

  // Charger toutes les vidéos
  loadVideos(): void {
    this.videoService.getAllVideos()
    .subscribe({
      next: (data) => {
        this.videos = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des vidéos';
        console.error(err);
        this.loading = false;
      }
    });
  }
}