import { Component, ElementRef, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { Box, Container } from '../models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Haha';
  last_btn_id: number = 0;
  last_box_id: number = 0;
  color_menu_is_shown: boolean = false;
  cur_box_id: number = 0;
  storage: Container = new Container();
  build_field: string = "";
  @ViewChild('main') mainDiv !: ElementRef;

  constructor(private renderer: Renderer2) {

  }

  buildElements() {
    this.last_btn_id = 0;
    this.last_box_id = 0;
    let main = this.mainDiv.nativeElement;
    let init_container = main.querySelector('#container-0');

    let parsedData = JSON.parse(this.build_field)
    let main_el = this.renderer.createElement('div');
    this.renderer.addClass(main_el, 'container');
    main_el = this.buildFromData(parsedData, main_el);
    this.renderer.removeChild(main, init_container);
    this.renderer.appendChild(main, main_el);


  }

  deleteIds(node: any) {
    if (node.items.length === 0) {
      return;
    }
    delete node.id;

    node.items.forEach((item: any) => {
      if (item.type === 'container') {
        this.deleteIds(item);
      } else if (item.type === 'box') {
        delete item.id;
      }

    })
  }

  toJSON() {
    let storage = this.storage;
    this.deleteIds(storage);
    console.log(storage);

  }

  getFormattedContainer(main_el: any, add_btn: any = this.createButton(this.last_btn_id)) {
    main_el.id = 'container-' + this.last_btn_id.toString();
    this.last_btn_id++;
    this.renderer.appendChild(main_el, add_btn);
  }

  buildFromData(node: any, main_el: any) {
    let add_btn = this.createButton(this.last_btn_id);
    this.getFormattedContainer(main_el, add_btn);
    if (node.items.length === 0) {
      let tmp = this.renderer.createElement('div');
      this.renderer.addClass(tmp, node.type);
      this.getFormattedContainer(tmp);
      return tmp;
    }
    let el: any = null;

    node.items.forEach((item: any) => {
      if (item.type === 'container') {
        el = this.renderer.createElement('div');
        this.renderer.addClass(el, node.type);
        el = this.buildFromData(item, el);
      } else {
        el = this.renderer.createElement('div');
        this.renderer.addClass(el, item.type);
        this.renderer.addClass(el, item.color);
      }
      this.renderer.insertBefore(main_el, el, add_btn);
    });

    return main_el;
  }

  showButtons(id: number) {

    let main = this.mainDiv.nativeElement;
    let element = main.querySelector('#add-btn-' + id.toString());
    let dropdown_menu = main.querySelector('.dropdown-menu');

    let rect = element.getBoundingClientRect();
    dropdown_menu = this.getMovedMenu(dropdown_menu, rect);

    let box_btn = main.querySelector('.t-box');
    let container_btn = main.querySelector('.t-container');
    box_btn.id = 'sub-box-btn-' + id.toString();
    container_btn.id = 'sub-container-btn-' + id.toString();
  }



  showColorMenu(id: number) {
    let main = this.mainDiv.nativeElement;
    let element = main.querySelector('#box-' + id.toString());
    let color_menu = main.querySelector('.color-palette')
    let rect = element.getBoundingClientRect();
    color_menu = this.getMovedMenu(color_menu, rect, 0, +30);
    this.color_menu_is_shown = true
    this.cur_box_id = id;
  }

  getMovedMenu(dropdown_menu: any, rect: any, diff_left: number = -30, diff_top: number = -30) {
    dropdown_menu.classList.remove('disabled');
    dropdown_menu.style.position = 'absolute';
    let new_left = (rect.left + diff_left).toString() + 'px';
    let new_top = (rect.top + diff_top + window.pageYOffset).toString() + 'px';
    dropdown_menu.style.left = new_left;
    dropdown_menu.style.top = new_top;
    return dropdown_menu;
  }

  hideButtons() {
    let main = this.mainDiv.nativeElement;
    let dropdown_menu = main.querySelector('.dropdown-menu');
    dropdown_menu.classList.add('disabled');
    let box_btn = main.querySelector('.t-box');
    let container_btn = main.querySelector('.t-container');
    box_btn.id = '';
    container_btn.id = '';
  }

  hideColorMenu(menu: any, color_menu: any) {
    color_menu.classList.add('disabled');
    this.color_menu_is_shown = false
    this.cur_box_id = -1;


  }

  colorBtn(color: string) {
    if (this.color_menu_is_shown && this.cur_box_id > -1) {

      let main = this.mainDiv.nativeElement;
      let id = '#box-' + this.cur_box_id.toString();
      let box = main.querySelector(id);
      box.style.backgroundColor = '#' + color;
      this.storage.changeBoxColor(this.storage, this.cur_box_id, color)



      box.style.color = color;
      this.hideColorMenu(main, main.querySelector('.color-palette'));
    }
  }

  createButton(id: number) {
    let new_btn = this.renderer.createElement('button');
    new_btn.innerHTML = 'Add';
    this.renderer.addClass(new_btn, 'add-btn');
    this.renderer.listen(new_btn, 'click', event => {
      this.hideButtons();

    })
    this.renderer.listen(new_btn, 'mouseenter', event => {

      this.showButtons(id);

    })
    new_btn.id = 'add-btn-' + id;
    return new_btn
  }

  getFormattedBox(id: number, element: any) {
    this.renderer['addClass'](element, 'box');
    element.id = 'box-' + id.toString();
    this.renderer.listen(element, 'click', event => {
      this.showColorMenu(id);

    })
    return element;
  }




  addElement(type: string) {
    let main = this.mainDiv.nativeElement;
    let element = this.renderer.createElement('div');
    let box_btn = main.querySelector('.t-box');
    let box_id_list = box_btn.id.split('-');
    let box_id = box_id_list[box_id_list.length - 1]
    let add_btn = main.querySelector('#add-btn-' + box_id);
    this.hideColorMenu(main, main.querySelector('.color-palette'));
    let new_node!: Box | Container;
    switch (type) {
      case 'box':
        element = this.getFormattedBox(this.last_box_id, element);
        new_node = new Box(this.last_box_id);
        this.last_box_id++;
        break;
      case 'container':
        this.last_btn_id++;
        element.id = 'container-' + this.last_btn_id.toString();
        new_node = new Container(this.last_btn_id);
        this.renderer['addClass'](element, 'container');
        let new_btn = this.createButton(this.last_btn_id)
        this.renderer.appendChild(element, new_btn);
        break;
    }

    this.storage.addElement(this.storage, parseInt(box_id), new_node);
    main = main.querySelector('#container-' + box_id);
    this.renderer.insertBefore(main, element, add_btn);
    this.hideButtons();
  }
}
