import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {BusinessUnitDesignerService} from '../../../services/crud/business-unit-designer.service';

@Component({
  selector: 'app-business-unit-designer-list',
  templateUrl: './business-unit-designer-list.component.html',
  styleUrls: ['./business-unit-designer-list.component.css']
})
export class BusinessUnitDesignerListComponent extends  PageComponent implements OnInit {

  tableData: any[];

  constructor(private service: BusinessUnitDesignerService,
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
    let command = 'STATICPAGE[NAME:business-unit-designer-form,TITLE:Business Unit Designer Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:business-unit-designer-form,TITLE:Business Unit Designer Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }
}
