import { Component, Renderer2 } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Haha';
  static BASE_URL = 'https://test-back3.herokuapp.com';

  constructor(private renderer: Renderer2, private AppService: AppService) {

  }
}
