import {Component, OnInit} from '@angular/core';
import {ListDTO} from "../../../dtos/list/list-dto";
import {CommandNavigatorService} from "../../../services/system/command-navigator.service";
import {RuleDesignerService} from "../../../services/crud/rule-designer.service";
import {PageComponent} from "../../page/page-component";

@Component({
  selector: 'app-rule-designer-list',
  templateUrl: './rule-designer-list.component.html',
  styleUrls: ['./rule-designer-list.component.scss']
})
export class RuleDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<ListDTO>;
  public filteredTableData: Array<ListDTO>;

  constructor(private service: RuleDesignerService,
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
    this.service.get().subscribe(data => {
      this.tableData = data;
      this.filteredTableData = this?.tableData
    });
  }

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  openPage(id: string) {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-designer-form","LOCATE":{"ID":"${id}"}}`);
  }

  openNewPage() {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-designer-form"}`);
  }

  clone(id: string) {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-designer-form","TYPE":"CLONE","LOCATE":{"ID":"${id}"}}`);
  }

}
