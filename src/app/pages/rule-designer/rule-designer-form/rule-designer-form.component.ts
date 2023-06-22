import {Component, OnInit} from '@angular/core';
import {RuleSettingsDTO} from "../../../dtos/rule/rule-settings-d-t-o";
import {ActivatedRoute, Router} from "@angular/router";
import {RuleDesignerService} from "../../../services/crud/rule-designer.service";
import {Location} from "@angular/common";
import {PageComponent} from "../../page/page-component";
import {FormScript} from "../../../dtos/form/form-script";
import {BaseDTO} from "../../../dtos/common/base-dto";
import {RuleSettingsQueryDTO} from "../../../dtos/rule/rule-settings-query-dto";
import {AceConfigInterface} from "ngx-ace-wrapper";
import {SqlFormatterService} from "../../../services/system/sql-formatter.service";

@Component({
  selector: 'app-rule-designer-form',
  templateUrl: './rule-designer-form.component.html',
  styleUrls: ['./rule-designer-form.component.scss']
})
export class RuleDesignerFormComponent extends PageComponent implements OnInit {

  public dto: RuleSettingsDTO;
  public mode: string;
  public visibleSection = 'general';
  public selectedQuery: RuleSettingsQueryDTO;

  constructor(private activatedRoute: ActivatedRoute,
              private service: RuleDesignerService,
              private router: Router,
              private location: Location,
              private sqlFormatterService: SqlFormatterService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new RuleSettingsDTO();

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

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        this.dto.id = null;
        this.dto.version = null;
        this.mode = 'new-record';
      }
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

  addScript() {
    const query = new RuleSettingsQueryDTO();
    query.shortOrder = this.getNextShortOrder(this.dto.queryList);
    query.title = 'Query ' + query.shortOrder;
    this.dto.queryList.push(query);
    this.setDefaultSelectedFormScript();
  }

  setDefaultSelectedFormScript() {
    if (this.selectedQuery != null) {
      return;
    }
    if (this.dto.queryList != null && this.dto.queryList.length > 0) {
      this.selectedQuery = this.dto.queryList[0];
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

  removeQueryByField(query: RuleSettingsQueryDTO) {
    this.dto.queryList =
      this.dto.queryList.filter(item => item !== query);
  }

  setSelectedQuery(query: RuleSettingsQueryDTO) {
    this.selectedQuery = query;
  }

  moveUp(baseDTO: BaseDTO, baseDTOs: BaseDTO[]): any {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && position > 0) {
        const prevItem = baseDTOs[position - 1];
        baseDTOs[position] = prevItem;
        baseDTOs[position - 1] = listBaseDTO;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listBaseDTO of baseDTOs) {
      listBaseDTO.shortOrder = shortOrder;
      shortOrder++;
    }

    return baseDTOs;
  }

  moveDown(baseDTO: BaseDTO, baseDTOs: BaseDTO[]): any[] {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && (position + 1) < baseDTOs.length) {
        const nextItem = baseDTOs[position + 1];
        baseDTOs[position] = nextItem;
        baseDTOs[position + 1] = listBaseDTO;
        break;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listBaseDTO of baseDTOs) {
      listBaseDTO.shortOrder = shortOrder;
      shortOrder++;
    }

    return baseDTOs;
  }

  stringify(command: string) {
    var parsedJson = JSON.parse(command);
    return JSON.stringify(parsedJson);
  }

  beautify(command: string) {
    var parsedJson = JSON.parse(command);
    return JSON.stringify(parsedJson, null, 4);
  }

  beautifySql(query: string) {

    const result = this.sqlFormatterService.beautifySql(query);
    return result;
  }

}
