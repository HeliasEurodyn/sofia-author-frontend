import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {SearchDesignerService} from '../../../../services/crud/sofia/search-designer.service';

@Component({
  selector: 'app-search-designer-list',
  templateUrl: './search-designer-list.component.html',
  styleUrls: ['./search-designer-list.component.css']
})
export class SearchDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: SearchDesignerService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.get().subscribe(data => {
      this.tableData = data;
    });
  }

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  onFocusIn() {
    this.refresh();
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:search-designer-form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:search-designer-form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:search-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
