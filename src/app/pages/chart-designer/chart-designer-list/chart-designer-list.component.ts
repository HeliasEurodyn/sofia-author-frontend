import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {ChartDesignerService} from '../../../services/crud/sofia/chart-designer.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-chart-designer-list',
  templateUrl: './chart-designer-list.component.html',
  styleUrls: ['./chart-designer-list.component.css']
})
export class ChartDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: ChartDesignerService,
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
    let command = 'STATICPAGE[NAME:chart-designer-form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:chart-designer-form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:chart-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';

    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }


}
