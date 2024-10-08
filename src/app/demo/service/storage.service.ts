import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = environment.apiUrl + 'file-storage'; // Your backend API endpoint

  constructor(private http: HttpClient) { }

  downloadFile(folderId: string, uuid: string): Observable<Blob> {
    const url = `${this.apiUrl}/download/${folderId}/${uuid}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
