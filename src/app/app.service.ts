import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
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
