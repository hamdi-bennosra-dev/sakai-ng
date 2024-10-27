import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoMetadata } from 'src/app/layout/models/video-metadata';
import { VideoService } from 'src/app/layout/service/data.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
    public videoMetadata: VideoMetadata = new VideoMetadata(0, '', '', '', '');

    @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;

    constructor(
        public dataService: VideoService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((param) => {
            const id = param['id'];
            if (id) {
                this.dataService.findById(id).then((vmd) => {
                    this.videoMetadata = vmd;
                });
                this.loadVideo(id);
            }
        });
    }

    loadVideo(id: string | number): void {
        this.dataService.streamVideo(id).subscribe((blob) => {
            const videoURL = URL.createObjectURL(blob);
            const video = this.videoPlayerRef.nativeElement;
            video.src = videoURL;
            video.load();
            video.play();

            console.log(video, this.videoPlayerRef.nativeElement)
        });
    }
}
