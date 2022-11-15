import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HtmlDashboardDTO} from '../../../dtos/html-dashboard/html-dashboard-dto';
import {HtmlDashboardDesignerService} from '../../../services/crud/html-dashboard-designer.service';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/html';
import 'brace/theme/chrome';

@Component({
  selector: 'app-html-dashboard-designer-form',
  templateUrl: './html-dashboard-designer-form.component.html',
  styleUrls: ['./html-dashboard-designer-form.component.css']
})
export class HtmlDashboardDesignerFormComponent extends PageComponent implements OnInit {

  public dto: HtmlDashboardDTO;
  public mode: string;
  public visibleSection = 'general';

  public aceHtmlEditorConfig: AceConfigInterface = {
    mode: 'html',
    theme: 'chrome',
    readOnly : false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: HtmlDashboardDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new HtmlDashboardDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {
    if (this.mode === 'edit-record') {
      this.service.update(this.dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(this.dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.mode = 'new-record';
      }
    }
  }


}
