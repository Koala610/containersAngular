
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Box, Container } from 'src/models/models';
import { AppDetailServiceService } from './app-detail-service.service';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit {
  last_btn_id: number = 0;
  last_box_id: number = 0;
  cur_box_id: number = 0;
  storage: Container = new Container(0);
  build_field: string = "";
  @ViewChild('main', {static: true}) mainDiv !: ElementRef;
  constructor(private AppDetailService: AppDetailServiceService,
    private route: ActivatedRoute,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    let id:string = this.route.snapshot.paramMap.get('id') || '-1';
    /*this.AppDetailService.getContainer(parseInt(id)).subscribe({
      next: (val) => console.log(val),
      error: (err) => console.log(err),
      complete: () => console.log('Done')
      
      
      
    })*/
    this.build_field = '"{"items":[{"color":"red","type":"box"},{"id":1,"items":[],"type":"container"}],"type":"container"}"'
    this.buildElements()
  }

  buildElements() {
    this.last_btn_id = 0;
    this.last_box_id = 0;
    console.log(this.mainDiv);
    
    let main = this.mainDiv.nativeElement;
    let modified_field = '';
    try {
      modified_field = this.build_field.slice(1, this.build_field.length - 1);
    } catch (error) {

    }

    let parsedData = JSON.parse(modified_field);
    let data = this.buildFromData(parsedData, this.storage);
    let main_el = data[0];
    this.storage = data[1];



    this.renderer.appendChild(main, main_el);


  }


  buildFromData(node: any, storage: Container = new Container(this.last_btn_id)) {
    let main_el = this.renderer.createElement('div');
    this.renderer.addClass(main_el, node.type);
    this.getFormattedContainer(main_el);
    if (node.items.length === 0) {
      let tmp = new Container(this.last_btn_id);
      this.last_btn_id++;
      return [main_el, tmp];
    }
    this.last_btn_id++;
    let el: any = null;
    let new_node: Container | Box;

    node.items.forEach((item: any) => {
      if (item.type === 'container') {
        let data = this.buildFromData(item);
        el = data[0];

        new_node = data[1];
      } else {
        new_node = new Box(this.last_box_id);

        new_node.color = item.color;
        el = this.renderer.createElement('div');
        el = this.getFormattedBox(this.last_box_id, el);
        this.renderer.setStyle(el, 'background-color', item.color);
        this.last_box_id++;
      }

      storage.items.push(new_node);

      this.renderer.appendChild(main_el, el);
    });

    return [main_el, storage];
  }

  getFormattedBox(id: number, element: any) {
    this.renderer['addClass'](element, 'box');
    element.id = 'box-' + id.toString();
    return element;
  }
  getFormattedContainer(main_el: any) {
    main_el.id = 'container-' + this.last_btn_id.toString();
  }

}
