import { Component, OnInit } from '@angular/core';
import {CustomQueryDesignerService} from '../../../services/crud/sofia/custom-query-designer.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {LanguageService} from '../../../services/crud/sofia/language.service';

@Component({
  selector: 'app-language-designer-list',
  templateUrl: './language-designer-list.component.html',
  styleUrls: ['./language-designer-list.component.css']
})
export class LanguageDesignerListComponent extends PageComponent implements OnInit {

  tableData: any[];

  constructor(private service: LanguageService,
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
    let command = 'STATICPAGE[NAME:language-designer-form,TITLE:Language]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:language-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }
}
