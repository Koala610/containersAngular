import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AppMainService {
  BASE_URL = AppComponent.BASE_URL;

  constructor(private client : HttpClient) { }

  addContainer(container:object):Observable<object>{
    let httpOptions = {
      headers: new HttpHeaders()
    }
      httpOptions.headers.append('Content-Type', 'application/json');
    return this.client.post<object>(this.BASE_URL+'/api/containers/', container, httpOptions)
  }
}
