import { Component, OnInit } from '@angular/core';
import {PageComponent} from "../../page/page-component";
import {RuleSettingsDTO} from "../../../dtos/rule/rule-settings-d-t-o";
import {RuleSettingsQueryDTO} from "../../../dtos/rule/rule-settings-query-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {RuleDesignerService} from "../../../services/crud/rule-designer.service";
import {Location} from "@angular/common";
import {SqlFormatterService} from "../../../services/system/sql-formatter.service";
import {BaseDTO} from "../../../dtos/common/base-dto";
import {RuleFieldDesignerService} from "../../../services/crud/rule-field-designer.service";
import {RuleFieldDTO} from "../../../dtos/rule/rule-field-dto";
import {RuleCodeDTO} from "../../../dtos/rule/rule-code-dto";

@Component({
  selector: 'app-rule-field-designer-form',
  templateUrl: './rule-field-designer-form.component.html',
  styleUrls: ['./rule-field-designer-form.component.scss']
})
export class RuleFieldDesignerFormComponent extends PageComponent implements OnInit {

  public dto: RuleFieldDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: RuleFieldDesignerService,
              private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new RuleFieldDTO();

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

  addCode() {
    if(this.dto.codeList == null){
      this.dto.codeList = [];
    }

    const ruleCodeDTO = new RuleCodeDTO();
    ruleCodeDTO.shortOrder = this.getNextShortOrder(this.dto.codeList);
    this.createRuleCode(ruleCodeDTO);
    this.dto.codeList.push(ruleCodeDTO);
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

  createRuleCode(ruleCode: RuleCodeDTO) {
    ruleCode.name = 'code' + ruleCode.shortOrder;
    ruleCode.value = 'value' + ruleCode.shortOrder;
    const exists = this.dto.codeList.some(item => item.name === ruleCode.name);
    if(exists){
      ruleCode.shortOrder = ruleCode.shortOrder +1;
      this.createRuleCode(ruleCode);
    }
  }


  removeRuleCode(ruleCode: RuleCodeDTO) {
      this.dto.codeList =
        this.dto.codeList.filter(item => item !== ruleCode);
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

}
