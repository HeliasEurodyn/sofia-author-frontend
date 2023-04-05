import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../services/crud/menu.service';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import { MenuDTO } from 'app/dtos/menu/menuDTO';

@Component({
  selector: 'app-menu-designer-list',
  templateUrl: './menu-designer-list.component.html',
  styleUrls: ['./menu-designer-list.component.css']
})
export class MenuDesignerListComponent extends PageComponent implements OnInit {
  public tableData: Array<MenuDTO>;
  public filteredTableData: Array<MenuDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;

  constructor(private menuDesignerService: MenuService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.tags = new Array<String>();
    this.showTagButtonTitle = 'Show Grouping'
    this.showTagGrouping = false;
    this.refreshTag();
    this.refresh();
  }

  onFocusIn() {
    this.refresh();
  }

  refresh() {
    this.menuDesignerService.get().subscribe(data => {
      this.tableData = data;
      this.filteredTableData = this?.tableData
    });
  }

  refreshTag(){
    this.menuDesignerService.getTags().subscribe(data => {
      this.tags = data;
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

  filterGroup(item: any) {
    this.menuDesignerService.getDataByTag(item.title).subscribe(data => {
      this.filteredTableData = data;
    });
  }

  clearFilterGroup() {
     this.filteredTableData = this?.tableData;
    
  }

  showTagsGrouping() {
    this.showTagGrouping = !this.showTagGrouping
    if (this.showTagGrouping === true) {
      this.showTagButtonTitle = 'Hide Grouping'
    } else {
      this.showTagButtonTitle = 'Show Grouping'
    }
  }

}
