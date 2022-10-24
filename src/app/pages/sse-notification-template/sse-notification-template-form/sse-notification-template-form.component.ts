import {Component, OnInit} from '@angular/core';
import {SseNotificationDTO} from '../../../dtos/sofia/sse-notification/sse-notification-dto';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import {ActivatedRoute} from '@angular/router';
import {SseNotificationTemplateService} from '../../../services/crud/sse-notification-template.service';
import {PageComponent} from '../../page/page-component';
import {Location} from '@angular/common';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/sqlserver';

@Component({
  selector: 'app-sse-notification-template-form',
  templateUrl: './sse-notification-template-form.component.html',
  styleUrls: ['./sse-notification-template-form.component.css']
})
export class SseNotificationTemplateFormComponent extends PageComponent implements OnInit {

  public dto: SseNotificationDTO;
  public mode: string;
  public visibleSection = 'general';

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly: false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: SseNotificationTemplateService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new SseNotificationDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = atob(this.dto?.query);
      });
    }
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
    const base64Query = btoa(dtoToBeSaved.query);
    dtoToBeSaved.query = base64Query;

    if (this.mode === 'edit-record') {
      console.log(dtoToBeSaved);
      this.service.update(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto?.id).subscribe(data => {
      this.location.back();
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

}
