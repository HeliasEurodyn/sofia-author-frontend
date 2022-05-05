import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../../services/crud/sofia/menu.service';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-menu-designer-list',
  templateUrl: './menu-designer-list.component.html',
  styleUrls: ['./menu-designer-list.component.css']
})
export class MenuDesignerListComponent extends PageComponent implements OnInit {
  public tableData: any;

  constructor(private menuDesignerService: MenuService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  onFocusIn() {
    this.refresh();
  }

  refresh() {
    this.menuDesignerService.get().subscribe(data => {
      this.tableData = data;
    });
  }

  delete(row: any) {
    this.menuDesignerService.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:menu-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openTranslationPage(id: string) {
    let command = 'STATICPAGE[NAME:menu-designer-translation-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:menu-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:menu-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
