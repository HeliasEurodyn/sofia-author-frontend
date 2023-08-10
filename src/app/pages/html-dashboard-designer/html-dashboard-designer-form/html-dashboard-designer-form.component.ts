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
import {HtmlDashboardScriptDTO} from "../../../dtos/html-dashboard/html-dashboard-script-dto";
import {ListScriptDTO} from "../../../dtos/list/list-script-dto";
import {BaseDTO} from "../../../dtos/common/base-dto";

@Component({
  selector: 'app-html-dashboard-designer-form',
  templateUrl: './html-dashboard-designer-form.component.html',
  styleUrls: ['./html-dashboard-designer-form.component.css']
})
export class HtmlDashboardDesignerFormComponent extends PageComponent implements OnInit {

  public dto: HtmlDashboardDTO;
  public mode: string;
  public visibleSection = 'general';
  public selectedScript: HtmlDashboardScriptDTO;
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

        this.dto.scripts.forEach(listScript => {
          const decodedScrypt = decodeURIComponent(atob(listScript.script));
          listScript.script = decodedScrypt;
        });

        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {

    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));

    const base64Html = btoa(encodeURIComponent(dtoToBeSaved?.html));
    dtoToBeSaved.html = base64Html;

    if(dtoToBeSaved.scripts != null)
    dtoToBeSaved.scripts.forEach(listScript => {
      const encodedScrypt = btoa(encodeURIComponent(listScript.script));
      listScript.script = encodedScrypt;
    });

    if (this.mode === 'edit-record') {
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

  public addScript() {
    if (this.dto.scripts == null) {
      this.dto.scripts = [];
    }
    const listScript = new ListScriptDTO();
    listScript.shortOrder = this.getNextShortOrder(this.dto.scripts);
    listScript.name = 'Script' + listScript.shortOrder;
    this.dto.scripts.push(listScript);
    this.setDefaultSelectedListScript();
  }

  moveUp(selectedItem: any, list: any[]) {
    let position = 0;
    for (const listItem of list) {
      if (selectedItem === listItem && position > 0) {
        const prevItem = list[position - 1];
        list[position] = prevItem;
        list[position - 1] = listItem;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listItem of list) {
      listItem.shortOrder = shortOrder;
      shortOrder++;
    }
  }

  moveDown(selectedItem: any, list: any[]) {
    let position = 0;
    for (const listItem of list) {
      if (selectedItem === listItem && (position + 1) < list.length) {
        const nextItem = list[position + 1];
        list[position] = nextItem;
        list[position + 1] = listItem;
        break;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listItem of list) {
      listItem.shortOrder = shortOrder;
      shortOrder++;
    }
  }

  getNextShortOrder(baseDTOs: BaseDTO[]) {
    if (baseDTOs === null
      || baseDTOs === undefined
      || baseDTOs.length === 0) {
      return 1;
    }

    const curShortOrderObject = baseDTOs.reduce(function (prev, curr) {
      return prev.shortOrder < curr.shortOrder ? curr : prev;
    });

    return (curShortOrderObject.shortOrder + 1);
  }

  setDefaultSelectedListScript() {
    if (this.selectedScript != null) {
      return;
    }
    if (this.dto.scripts != null && this.dto.scripts.length > 0) {
      this.selectedScript = this.dto.scripts[0];
    }
  }

  removeScriptByField(script) {
    this.dto.scripts =
      this.dto.scripts.filter(item => item !== script);
  }

  setSelectedScript(script) {
    this.selectedScript = script;
  }
}
