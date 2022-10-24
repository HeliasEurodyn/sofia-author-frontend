import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {InfoCardDTO} from '../../../dtos/sofia/info-card/info-card-dto';
import {InfoCardDesignerService} from '../../../services/crud/sofia/info-card-designer.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {ListScriptDTO} from '../../../dtos/sofia/list/list-script-dto';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {ListDTO} from '../../../dtos/sofia/list/list-dto';
import {FormScript} from '../../../dtos/sofia/form/form-script';
import {InfoCardScriptDTO} from '../../../dtos/sofia/info-card/info-card-script-dto';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/mode/sql'
import 'brace/theme/sqlserver'

@Component({
  selector: 'app-info-card-designer-form',
  templateUrl: './info-card-designer-form.component.html',
  styleUrls: ['./info-card-designer-form.component.css']
})
export class InfoCardDesignerFormComponent extends PageComponent implements OnInit {

  public dto: InfoCardDTO;
  public mode: string;
  public visibleSection = 'general';
  public selectedScript: InfoCardScriptDTO;

  public aceJavascriptEditorConfig: AceConfigInterface = {
    mode: 'javascript',
    theme: 'github',
    readOnly : false
  };

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };


  constructor(private activatedRoute: ActivatedRoute,
              private service: InfoCardDesignerService,
              private navigatorService: CommandNavigatorService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new InfoCardDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = atob(this.dto.query);

        this.dto.scripts.forEach(listScript => {
          const decodedScrypt = atob(listScript.script);
          listScript.script = decodedScrypt;
        });

        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {
    const dto = JSON.parse(JSON.stringify(this.dto));
    dto.query = btoa(this.dto.query);

    dto.scripts.forEach(listScript => {
      const encodedScrypt = btoa(listScript.script);
      listScript.script = encodedScrypt;
    });

    if (this.mode === 'edit-record') {
      this.service.update(dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  openPage() {
    this.navigatorService.navigate(this.dto.command);
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
