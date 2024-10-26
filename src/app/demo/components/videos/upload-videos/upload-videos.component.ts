import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideoMetadata } from 'src/app/layout/models/video-metadata';
import { VideoService } from 'src/app/layout/service/data.service';
import { ToastService } from 'src/app/layout/service/toast.service';

@Component({
  selector: 'app-upload-videos',
  templateUrl: './upload-videos.component.html',
  styleUrls: ['./upload-videos.component.scss']
})
export class UploadVideosComponent {

  isError: boolean = false;

  constructor(
    private dataService: VideoService, 
    private router: Router,
    private toastr: ToastService // Injection du service Toastr
  ) { }

  submit() {
    console.log("Submit button");
    let form: HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);
      this.dataService.uploadNewVideo(fd)
        .then(() => {
          this.isError = false;
          this.toastr.showSuccess('Vidéo téléchargée avec succès !'); // Toast de succès
          this.router.navigate(['/videos/gallery/']);
        })
        .catch((err) => {
          this.isError = true;
          this.toastr.showError('Erreur lors du téléchargement de la vidéo.'); // Toast d'erreur
          console.error(err);
        });
    }
  }
}