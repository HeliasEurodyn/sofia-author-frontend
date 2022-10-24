import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/system/notification.service';
import {XlsImportService} from '../../services/crud/xls-import.service';
import {PageComponent} from '../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {XlsImportDTO} from '../../dtos/sofia/xls-import/xls-import-dto';

@Component({
  selector: 'app-xls-import',
  templateUrl: './xls-import.component.html',
  styleUrls: ['./xls-import.component.css']
})
export class XlsImportComponent extends PageComponent implements OnInit {

  dto: XlsImportDTO = new XlsImportDTO();
  fileToUpload: File = null;
  reportFilename = '';
  fileRequiredWarning = '';
  id = '';

  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private service: XlsImportService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      this.id = locateParams.get('ID');
      this.refresh(this.id);
    }
  }

  refresh(id): void {
    this.service.getById(id).subscribe(dto => {
      this.dto = dto;
    });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    this.reportFilename = this.fileToUpload.name;
    this.fileRequiredWarning = '';
  }

  clearFile() {
    this.fileToUpload = null;
    this.reportFilename = '';
  }

  import() {
    if (this.reportFilename == null || this.reportFilename === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-file-code',
        '<b>Xls File is required</b>');
      this.fileRequiredWarning = 'File is required';
      return;
    }

    if (this.id === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-file-code',
        '<b>No import selected</b>');
      return;
    }

    this.service.import(this.id, this.fileToUpload).subscribe(responce => {
      this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-file-code',
        '<b>Import Finished.</b>');
    });
  }
}
