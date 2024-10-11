import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/layout/service/data.service';

@Component({
  selector: 'app-upload-videos',
  templateUrl: './upload-videos.component.html',
  styleUrl: './upload-videos.component.scss'
})
export class UploadVideosComponent {

  isError: boolean = false;

  constructor(private dataService: VideoService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    console.log("Submit button")
    let form:HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);
      this.dataService.uploadNewVideo(fd)
        .then(() => {
          this.isError = false;
          this.router.navigate(['player/1']);
        })
        .catch((err) => {
          this.isError = true;
          console.error(err);
        });
    }
  }

}
