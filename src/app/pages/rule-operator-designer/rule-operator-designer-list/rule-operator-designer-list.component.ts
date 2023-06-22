import {Component, OnInit} from '@angular/core';
import {PageComponent} from "../../page/page-component";
import {ListDTO} from "../../../dtos/list/list-dto";
import {CommandNavigatorService} from "../../../services/system/command-navigator.service";
import {RuleOperatorDesignerService} from "../../../services/crud/rule-operator-designer.service";

@Component({
  selector: 'app-rule-operator-designer-list',
  templateUrl: './rule-operator-designer-list.component.html',
  styleUrls: ['./rule-operator-designer-list.component.scss']
})
export class RuleOperatorDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<ListDTO>;
  public filteredTableData: Array<ListDTO>;

  constructor(private service: RuleOperatorDesignerService,
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
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-operator-designer-form","LOCATE":{"ID":"${id}"}}`);
  }

  openNewPage() {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-operator-designer-form"}`);
  }

  clone(id: string) {
    this.navigatorService.navigate(`{"COMMAND-TYPE":"STATICPAGE","NAME":"rule-operator-designer-form","TYPE":"CLONE","LOCATE":{"ID":"${id}"}}`);
  }

}

