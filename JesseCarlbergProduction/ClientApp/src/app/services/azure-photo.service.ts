import { Injectable } from '@angular/core';
import { ContactRequest } from './models/contactRequest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Injectable({
  providedIn: 'root',
})
export class AzurePhotoService {
  constructor(private http: HttpClient) {}

  uploadImage(files): Observable<any> {
    let url = '/api/AzImages/Upload';
    let input = new FormData();
    input.append('files', files);
    return this.http.post(url, input, HttpUploadOptions);
  }

  getThumbnails(): Observable<any> {
    return this.http.get<any>('/api/AzImages/thumbnails');
  }

  getImages(): Observable<any> {
    return this.http.get<any>('/api/AzImages/images');
  }
}
