import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoMetadata } from '../models/video-metadata';
import { environment } from 'src/environments/environment';

export interface VideoMetadataRepresentation {
  id: number;
  title: string;
  description: string;
  previewUrl: string;
  // Add other fields as needed
}

export interface NewVideoRepresentation {
  title: string;
  description: string;
  videoFile: File;
  previewFile: File;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = environment.apiUrl + 'video';

  constructor(private http: HttpClient) {} 

    // Get all video metadata
  getAllVideos(): Observable<VideoMetadata[]> {
    return this.http.get<VideoMetadata[]>(`${this.apiUrl}/all`);
  }

    // Get preview image for a video
  getPreviewImage(id: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/preview/${id}`, {
        responseType: 'blob'
      });
    }

  // Get video metadata by ID
  getVideoById(id: number): Observable<VideoMetadata> {
    return this.http.get<VideoMetadata>(`${this.apiUrl}/${id}`);
  }

  public findById(id: number) {
    return this.http.get<VideoMetadata>(`${this.apiUrl}/${id}`).toPromise()
  }


  // Stream video by ID with optional range
  streamVideo(id: number, rangeHeader?: string): Observable<Blob> {
    const headers = rangeHeader ? new HttpHeaders().set('Range', rangeHeader) : new HttpHeaders();
    return this.http.get(`${this.apiUrl}/stream/${id}`, {
      headers,
      responseType: 'blob'
    });
  }

  // Upload a new video
  uploadVideo(video: NewVideoRepresentation): Observable<void> {
    const formData = new FormData();
    formData.append('title', video.title);
    formData.append('description', video.description);
    formData.append('videoFile', video.videoFile);
    formData.append('previewFile', video.previewFile);

    return this.http.post<void>(`${this.apiUrl}/upload`, formData, {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data')
    });
  }

  public uploadNewVideo(formData: FormData) {
    return this.http.post(`${this.apiUrl}/upload`, formData).toPromise()
  }
  
}




// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { VideoMetadata } from '../models/video-metadata';

// export interface VideoMetadataRepresentation {
//   id: number;
//   title: string;
//   description: string;
//   previewUrl: string;
//   // Add other fields as needed
// }

// export interface NewVideoRepresentation {
//   title: string;
//   description: string;
//   videoFile: File;
//   previewFile: File;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class VideoService {
//   private apiUrl = 'http://localhost:8080/v1/video';

//   constructor(private http: HttpClient) { }

//   // Get all video metadata
//   getAllVideos(): Observable<VideoMetadataRepresentation[]> {
//     return this.http.get<VideoMetadataRepresentation[]>(`${this.apiUrl}/all`);
//   }

//   // public findAllPreviews() {
//   //   return this.http.get<VideoMetadata[]>('/api/v1/video/all').toPromise()
//   // }

//   // Get video metadata by ID
//   getVideoById(id: number): Observable<VideoMetadataRepresentation> {
//     return this.http.get<VideoMetadataRepresentation>(`${this.apiUrl}/${id}`);
//   }

//   // Get preview image for a video
//   getPreviewImage(id: number): Observable<Blob> {
//     return this.http.get(`${this.apiUrl}/preview/${id}`, {
//       responseType: 'blob'
//     });
//   }

//   // Stream video by ID with optional range
//   streamVideo(id: number, rangeHeader?: string): Observable<Blob> {
//     const headers = rangeHeader ? new HttpHeaders().set('Range', rangeHeader) : new HttpHeaders();
//     return this.http.get(`${this.apiUrl}/stream/${id}`, {
//       headers,
//       responseType: 'blob'
//     });
//   }

//   // Upload a new video
//   uploadVideo(video: NewVideoRepresentation): Observable<void> {
//     const formData = new FormData();
//     formData.append('title', video.title);
//     formData.append('description', video.description);
//     formData.append('videoFile', video.videoFile);
//     formData.append('previewFile', video.previewFile);

//     return this.http.post<void>(`${this.apiUrl}/upload`, formData, {
//       headers: new HttpHeaders().set('enctype', 'multipart/form-data')
//     });
//   }

//   public uploadNewVideo(formData: FormData) {
//     return this.http.post(`${this.apiUrl}/upload`, formData).toPromise()
//   }

// }

/***********************************************/

/*import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VideoMetadata} from "./video-metadata";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  } 


  public findAllPreviews() {
    return this.http.get<VideoMetadata[]>(this.apiUrl + '/api/v1/video/all').toPromise()
  }

  public findById(id: number) {
    return this.http.get<VideoMetadata>(this.apiUrl + '/api/v1/video/' + id).toPromise()
  }

  public uploadNewVideo(formData: FormData) {
    return this.http.post(this.apiUrl + '/api/v1/video/upload', formData).toPromise()
  }

  streamVideo(id: number, range?: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Range': range ? range : ''
    });

    return this.http.get(this.apiUrl + '/stream/' + id, {
      headers: headers,
      responseType: 'blob' // Nous voulons recevoir le contenu vidéo en tant que Blob
    });
  }

}*/
