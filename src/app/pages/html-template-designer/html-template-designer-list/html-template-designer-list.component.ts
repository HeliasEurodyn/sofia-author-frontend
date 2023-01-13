import { Component, OnInit } from '@angular/core';
import { PageComponent } from 'app/pages/page/page-component';
import { HtmlTemplateDesignerService } from 'app/services/crud/html-template-designer.service';
import { CommandNavigatorService } from 'app/services/system/command-navigator.service';

@Component({
  selector: 'app-html-template-designer-list',
  templateUrl: './html-template-designer-list.component.html',
  styleUrls: ['./html-template-designer-list.component.css']
})
export class HtmlTemplateDesignerListComponent extends PageComponent implements OnInit {
  
  tableData: any[];

  constructor(private service: HtmlTemplateDesignerService,
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
    let command = 'STATICPAGE[NAME:html-template-designer-form,TITLE:Html Template Designer Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:html-template-designer-form,TITLE:Html Template Designer Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:html-template-designer-form,TITLE:Html Template Designer Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
