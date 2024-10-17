import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private apiUrl = environment.apiUrl + 'file-storage'; // Your backend API endpoint

    constructor(private http: HttpClient) {}

    downloadFile(folderId: string, uuid: string): Observable<Blob> {
        const url = `${this.apiUrl}/download/${folderId}/${uuid}`;
        return this.http.get(url, { responseType: 'blob' });
    }

    uploadFile(
        folderId: string,
        resourceId: string,
        file: File
    ): Observable<string> {
        const url = `${this.apiUrl}/upload/${folderId}/${resourceId}`;

        // Create FormData object to hold the file to be uploaded
        const formData: FormData = new FormData();
        formData.append('image', file);

        // Set headers (multipart form-data)
        const headers = new HttpHeaders({
            Accept: 'application/json, text/plain',
        });

        // Make the POST request to upload the file
        const responseType = 'text';
        return this.http.post(url, formData, { headers, responseType });
    }

    private base64ToFile(base64String: string, filename: string): File {
        const byteString = atob(base64String.split(',')[1]); // Decode base64 string
        const mimeString = base64String
            .split(',')[0]
            .split(':')[1]
            .split(';')[0]; // Extract MIME type

        // Convert the decoded base64 string to a byte array
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }

        // Create a Blob from the byte array and mime type
        const blob = new Blob([byteArray], { type: mimeString });

        // Convert Blob to File (optional step to set a name for the file)
        return new File([blob], filename, { type: mimeString });
    }
}
