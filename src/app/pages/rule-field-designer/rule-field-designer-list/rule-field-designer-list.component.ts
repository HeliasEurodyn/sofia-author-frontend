import {Component, OnInit} from '@angular/core';
import {ListDTO} from "../../../dtos/list/list-dto";
import {CommandNavigatorService} from "../../../services/system/command-navigator.service";
import {PageComponent} from "../../page/page-component";
import {RuleFieldDesignerService} from "../../../services/crud/rule-field-designer.service";

@Component({
  selector: 'app-rule-field-designer-list',
  templateUrl: './rule-field-designer-list.component.html',
  styleUrls: ['./rule-field-designer-list.component.scss']
})
export class RuleFieldDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<ListDTO>;
  public filteredTableData: Array<ListDTO>;

  constructor(private service: RuleFieldDesignerService,
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
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-field-designer-form","LOCATE":{"ID":"${id}"}}`);
  }

  openNewPage() {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-field-designer-form"}`);
  }

  clone(id: string) {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-field-designer-form","TYPE":"CLONE","LOCATE":{"ID":"${id}"}}`);
  }

}
