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
  public sampleHtml =
    '<div class="card card-stats">\n' +
    '   <div class="card-body">\n' +
    '      <div class="row">\n' +
    '         <div class="col">\n' +
    '            <div class="icon-big text-center icon-warning"><img src="./assets/img/logo/sofia_logo.png"></div>\n' +
    '         </div>\n' +
    '         <div class="col">\n' +
    '            <div class="numbers">\n' +
    '               <p class="card-title" style="font-size: 23px;">Welcome</p>\n' +
    '               <div style="font-size: 13px;color: #424242;">Transform the way you create and customize applications to fit your unique business needs - try our highly sophisticated platform today and revolutionize your workflow!</div>\n' +
    '            </div>\n' +
    '         </div>\n' +
    '      </div>\n' +
    '   </div>\n' +
    '   <div class="card-footer" style="padding: 2px 21px 9px;">\n' +
    '      <hr style="margin: 8px;">\n' +
    '      <a class="stats" style="cursor: pointer;color: #424242;font-size: 12px;text-decoration: none;" target="_blank" href="https://github.com/HeliasEurodyn/sofia-frontend"><i class="fa fa-search"></i>View More...</a>\n' +
    '   </div>\n' +
    '</div>';

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
    this.dto.html = this.sampleHtml;

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.html = decodeURIComponent(atob(this.dto?.html));
        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {

    const base64Html = btoa(encodeURIComponent(this.dto?.html));
    this.dto.html = base64Html;
    console.log(this.dto);

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
