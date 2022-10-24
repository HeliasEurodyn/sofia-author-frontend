import { Component, OnInit } from '@angular/core';
import {UserGroupService} from '../../../services/crud/sofia/user-group.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {RoleService} from '../../../services/crud/sofia/role.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends PageComponent implements OnInit {

  tableData: any[];

  constructor(private service: RoleService,
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
    let command = 'STATICPAGE[NAME:role-form,TITLE:User Groups]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:role-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }
}
