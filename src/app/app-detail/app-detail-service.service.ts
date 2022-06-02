import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AppDetailServiceService {
  
  BASE_URL = AppComponent.BASE_URL;

  constructor(private client : HttpClient) { }

  getContainer(id:number):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders()
    }
      httpOptions.headers.append('Access-Control-Allow-Origin', '*');
      httpOptions.headers.append('Content-Type', 'application/json');
    return this.client.get<any>(this.BASE_URL+'/api/containers/'+id.toString(), httpOptions)
  }
}
