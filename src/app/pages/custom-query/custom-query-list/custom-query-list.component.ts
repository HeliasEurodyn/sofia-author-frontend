import {Component, OnInit} from '@angular/core';
import {CustomQueryDesignerService} from '../../../services/crud/sofia/custom-query-designer.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-custom-query-list',
  templateUrl: './custom-query-list.component.html',
  styleUrls: ['./custom-query-list.component.css']
})
export class CustomQueryListComponent extends PageComponent implements OnInit {
  tableData: any[];

  constructor(private service: CustomQueryDesignerService,
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

  createNew() {
    let command = 'STATICPAGE[NAME:custom-query-form,TITLE:Custom Queries]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:custom-query-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }
}
