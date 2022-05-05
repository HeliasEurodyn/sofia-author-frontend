import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {DataTransferService} from '../../../../services/crud/sofia/data-transfer.service';
import {NotificationService} from '../../../../services/system/sofia/notification.service';

@Component({
  selector: 'app-sofia-import-export-list',
  templateUrl: './data-transfer-list.component.html',
  styleUrls: ['./data-transfer-list.component.css']
})
export class DataTransferListComponent extends PageComponent implements OnInit {

  public tableData: any;
  public fileToUpload: File = null;
  public filename = '';
  @ViewChild('fileUploader', {static: false})
  fileUploader: ElementRef;

  constructor(private service: DataTransferService,
              private notificationService: NotificationService,
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
    let command = 'STATICPAGE[NAME:data-transfer-form,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:data-transfer-form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:data-transfer-form,TYPE:CLONE,LOCATE:(ID=' + id + ')]';

    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }


  export(id, name) {
    this.service.export(id).subscribe(data => {

      const element = document.createElement('a');
      const myJSON = data; // JSON.stringify(data);
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(myJSON));
      element.setAttribute('download', name + '.sofia');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files.item(0);
    this.filename = this.fileToUpload.name;
   // document.getElementById('files-upload').value = null;
    this.fileUploader.nativeElement.value = '';

    this.service.import(this.fileToUpload).subscribe(responce => {
      this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-file-code',
        '<b>File Imported.</b>');
    });
  }

  clearFile() {
    this.fileToUpload = null;
    this.filename = '';
  }
}
