import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  BASE_URL = 'http://localhost:3000'

  constructor(private client : HttpClient) { }
}
