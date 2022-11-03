import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../services/crud/security.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css']
})
export class SecurityListComponent  extends PageComponent implements OnInit {
  tableData: any[] = [];
  constructor(private service: SecurityService,
    private navigatorService: CommandNavigatorService) {
      super();
    }

  ngOnInit(): void {
    this.tableData = [];
    this.refresh();
  }

  refresh(){
    this.service.get().subscribe(data => {
      this.tableData = data;
    });
  }
  createNew() {
    let command = 'STATICPAGE[NAME:security-form,TITLE:Security]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:security-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

}
