import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-designer-form-tool-box',
  templateUrl: './form-designer-form-tool-box.component.html',
  styleUrls: ['./form-designer-form-tool-box.component.css']
})
export class FormDesignerFormToolBoxComponent implements OnInit {

  public sidebarColor: String = 'white';
  public sidebarActiveColor: String = 'danger';
  public state: Boolean = true;

  changeSidebarColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    if (sidebar != undefined) {
      sidebar.setAttribute('data-color', color);
    }
  }

  changeSidebarActiveColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');
    this.sidebarActiveColor = color;
    if (sidebar != undefined) {
      sidebar.setAttribute('data-active-color', color);
    }
  }

  ngOnInit() {
  }

}
