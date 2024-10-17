import { Component, Input, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoService } from 'src/app/layout/service/data.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: number = 5;  // L'ID de la vidéo à lire
  videoUrl: SafeUrl | null = null;  // URL de la vidéo sécurisée pour Angular
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadVideo();
  }

  // Charger la vidéo
  loadVideo(): void {
    if (this.videoId > 0) {
      const streamUrl = `http://localhost:8080/v1/video/stream/${this.videoId}`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(streamUrl); // Permet à Angular de faire confiance à l'URL
      this.loading = false;
    } else {
      this.errorMessage = 'ID de vidéo invalide.';
      this.loading = false;
    }
  }
}