import { Component, OnInit } from '@angular/core';
import { PageComponent } from 'app/pages/page/page-component';
import { RestDocumentationDesignerService } from 'app/services/crud/rest-documentation-designer.service';
import { CommandNavigatorService } from 'app/services/system/command-navigator.service';

@Component({
  selector: 'app-rest-documentation-designer-list',
  templateUrl: './rest-documentation-designer-list.component.html',
  styleUrls: ['./rest-documentation-designer-list.component.css']
})
export class RestDocumentationDesignerListComponent extends PageComponent implements OnInit {

  tableData: any[];

    constructor(private service: RestDocumentationDesignerService,
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
    let command = 'STATICPAGE[NAME:rest-documentation-designer-form,TITLE:Rest Documentation Designer Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:rest-documentation-designer-form,TITLE:Rest Documentation Designer Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:rest-documentation-designer-form,TITLE:Rest Documentation Designer Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
