import { Component, ElementRef, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { Box, Container } from '../models/models';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Haha';

  constructor(private renderer: Renderer2, private AppService: AppService) {

  }
}
