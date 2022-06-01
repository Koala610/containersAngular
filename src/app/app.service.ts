import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  BASE_URL = 'http://localhost:4200'

  constructor(private client : HttpClient) { }

  addContainer(container:string):Observable<string>{
    return this.client.post<string>(this.BASE_URL+'containers', container)
  }
}
