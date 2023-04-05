import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {FormDesignerService} from '../../../services/crud/form-designer.service';
import {NotificationService} from '../../../services/system/notification.service';
import {FormDto} from '../../../dtos/form/form-dto';

@Component({
  selector: 'app-form-designer-list',
  templateUrl: './form-designer-list.component.html',
  styleUrls: ['./form-designer-list.component.css']
})
export class FormDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<FormDto>;
  public filteredTableData: Array<FormDto>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;

  constructor(private service: FormDesignerService,
              private navigatorService: CommandNavigatorService,
              private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.tags = new Array<String>();
    this.showTagButtonTitle = 'Show Grouping'
    this.showTagGrouping = false;
    this.refreshTag();
    this.refresh();
  }

  refresh() {
    this.service.get().subscribe(data => {
      this.tableData = data;
      this.filteredTableData = this?.tableData
    });
  }

  refreshTag() {
    this.service.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  onFocusIn() {
    this.refresh();
  }

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openTranslationPage(id: string) {
    let command = 'STATICPAGE[NAME:form-designer-translation-form,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clearCache() {
    this.service.clearCache().subscribe(data => {
      this.notificationService.showNotification('top', 'center', 'alert-info',
        'fa-check', '<b>Cache</b> is cleared.');
    });
  }

  isGroupContentDivVisible() {
    if (this?.tags?.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  filterGroup(item: any) {
    this.service.getDataByTag(item.title).subscribe(data =>{
      this.filteredTableData = data;
    });
  }

  clearFilterGroup() {
    this.filteredTableData = this?.tableData;
  }

  showTagsGrouping() {
    this.showTagGrouping = !this.showTagGrouping
    if (this.showTagGrouping === true) {
      this.showTagButtonTitle = 'Hide Grouping'
    } else {
      this.showTagButtonTitle = 'Show Grouping'
    }
  }

}
