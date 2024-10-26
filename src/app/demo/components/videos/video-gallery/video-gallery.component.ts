import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from 'src/app/layout/models/video-metadata';
import { VideoService, VideoMetadataRepresentation, NewVideoRepresentation } from 'src/app/layout/service/data.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  videos: VideoMetadata[] = [];
  videoFile: File | null = null;
  previewFile: File | null = null;
  newVideoTitle: string = '';
  newVideoDescription: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadAllVideos();
  }

  // Load all videos from the server
  loadAllVideos(): void {
    this.videoService.getAllVideos().subscribe({
      next: (data) => {
        this.videos = data;
  
        // Pour chaque vidéo, charger l'aperçu sous forme d'image Blob
        this.videos.forEach(video => {
          this.videoService.getPreviewImage(video.id).subscribe({
            next: (blob) => {
              video.previewUrl = URL.createObjectURL(blob); // Convertir le Blob en URL d'image
            },
            error: (err) => {
              console.error(`Error loading preview for video ${video.id}:`, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error loading videos:', err);
      }
    });
  }
  

  // Méthode pour générer l'URL de prévisualisation à partir de l'ID vidéo
  getPreviewUrl(id: number): string {
    return `http://localhost:8080/v1/video/preview/${id}`;
  }
  
}
