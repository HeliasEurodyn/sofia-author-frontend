import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataTransferService} from '../../services/crud/data-transfer.service';
import {NotificationService} from '../../services/system/notification.service';
import {PageComponent} from '../page/page-component';
import {UserService} from '../../services/crud/user.service';
import {CommandNavigatorService} from '../../services/system/command-navigator.service';
import {FormDesignerService} from '../../services/crud/form-designer.service';
import {ListDesignerService} from '../../services/crud/list-designer.service';
import { AuthorDashboardService } from 'app/services/crud/author-dashboard.service';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent extends PageComponent implements OnInit {


  public fileToUpload: File = null;
  public filename = '';
  @ViewChild('fileUploader', {static: false})
  fileUploader: ElementRef;

  public usersList: any;
  public formsList: any;
  public listsList: any;
  public totals: any;

  constructor(private dataTransferService: DataTransferService,
              private userService: UserService,
              private listDesignerService: ListDesignerService,
              private formDesignerService: FormDesignerService,
              private notificationService: NotificationService,
              private navigatorService: CommandNavigatorService,
              private authorDashboardService: AuthorDashboardService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {

    this.authorDashboardService.getComponentsTotals().subscribe(data =>{
      this.totals = data;
    })

    this.userService.get10LatestUsers().subscribe(data => {
      this.usersList = data;
    });


    this.listDesignerService.get10LatestLists().subscribe(data => {
      this.listsList = data;
    });



    this.formDesignerService.get10LatestForms().subscribe(data => {
      this.formsList = data;
    });

  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files.item(0);
    this.filename = this.fileToUpload.name;
    this.fileUploader.nativeElement.value = '';

    this.dataTransferService.import(this.fileToUpload).subscribe(responce => {
      this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-file-code',
        '<b>File Imported.</b>');
    });
  }

  clearFile() {
    this.fileToUpload = null;
    this.filename = '';
  }

  openForm(id: any, page: string) {
    let command = 'STATICPAGE[NAME:' + page + ',LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openList(command: string) {
    this.navigatorService.navigate(command);
  }



}
