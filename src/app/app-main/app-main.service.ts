import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppMainService {
  BASE_URL = 'http://localhost:3000'

  constructor(private client : HttpClient) { }

  addContainer(container:object):Observable<object>{
    let httpOptions = {
      headers: new HttpHeaders()
    }
      httpOptions.headers.append('Access-Control-Allow-Origin', '*');
      httpOptions.headers.append('Content-Type', 'application/json');
    return this.client.post<object>(this.BASE_URL+'/api/containers/', container, httpOptions)
  }
}
