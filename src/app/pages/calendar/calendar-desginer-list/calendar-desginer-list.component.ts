import { Component, OnInit } from '@angular/core';
import { PageComponent } from 'app/pages/page/page-component';
import { CalendarDesignerService } from 'app/services/crud/calendar-designer.service';
import { CommandNavigatorService } from 'app/services/system/command-navigator.service';

@Component({
  selector: 'app-calendar-desginer-list',
  templateUrl: './calendar-desginer-list.component.html',
  styleUrls: ['./calendar-desginer-list.component.css']
})
export class CalendarDesginerListComponent extends PageComponent implements OnInit {

  tableData: any[];
  
  constructor(private service: CalendarDesignerService,
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
    let command = 'STATICPAGE[NAME:calendar-designer-form,TITLE:Calendar Designer Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:calendar-designer-form,TITLE:Calendar Designer Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:calendar-designer-form,TITLE:Calendar Designer Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
