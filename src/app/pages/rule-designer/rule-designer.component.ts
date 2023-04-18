import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CommandNavigatorService} from "../../services/system/command-navigator.service";
import {BaseDTO} from "../../dtos/common/base-dto";
import {PageComponent} from "../page/page-component";
import {RuleDTO, RuleExpressionDTO} from "../../dtos/rule/rule-dto";
import {RuleService} from "../../services/crud/rule.service";

@Component({
  selector: 'app-rule-designer',
  templateUrl: './rule-designer.component.html',
  styleUrls: ['./rule-designer.component.scss']
})
export class RuleDesignerComponent extends PageComponent implements OnInit {


  public dto: RuleDTO;
  public ruleExpressionDTO: RuleExpressionDTO;
  public selectedParentRuleExpressionDTO: RuleExpressionDTO;

  linecounter = 0;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: RuleService,
              private router: Router,
              private location: Location,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new RuleDTO();
    this.ruleExpressionDTO = new RuleExpressionDTO();

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

    this.refreshComponents();
  }

  refreshComponents() {
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        if (this.dto.ruleExpressionList != null) {
          this.cleanFieldListIdsIfCloneEnabled(this.dto.ruleExpressionList);
        }
        this.mode = 'new-record';
      }
    }
  }

  cleanFieldListIdsIfCloneEnabled(menuFieldList: RuleExpressionDTO[]) {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        for (const menuField of menuFieldList) {
          menuField.id = null;
          menuField.version = null;
          if (menuField.ruleExpressionList != null) {
            this.cleanFieldListIdsIfCloneEnabled(menuField.ruleExpressionList);
          }
        }
      }
    }
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  navigateToPreviousPage() {
    this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
  }

  setSelected(ruleExpressionDTO: RuleExpressionDTO) {
    this.ruleExpressionDTO = ruleExpressionDTO;
  }

  addChildMenuField(selectedParentMenuFieldComponent: RuleExpressionDTO) {
    this.linecounter++;

    const ruleExpressionDTO = new RuleExpressionDTO();
    ruleExpressionDTO.expanded = true;
    ruleExpressionDTO.ruleExpressionList = [];
    ruleExpressionDTO.shortOrder = this.linecounter;
    ruleExpressionDTO.childrenColor = this.getRandomColor();

    if (selectedParentMenuFieldComponent == null) {
      this.dto.ruleExpressionList.push(ruleExpressionDTO);
      ruleExpressionDTO.color = '#404040';
    } else {
      selectedParentMenuFieldComponent.expanded = true;
      selectedParentMenuFieldComponent.ruleExpressionList.push(ruleExpressionDTO);
      ruleExpressionDTO.parrent = selectedParentMenuFieldComponent;
      ruleExpressionDTO.color = selectedParentMenuFieldComponent.childrenColor;
      alert('');
    }
  }

  getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  addMenuField() {
    this.linecounter++;
    this.selectedParentRuleExpressionDTO = null;
    this.ruleExpressionDTO = new RuleExpressionDTO();
    this.ruleExpressionDTO.ruleExpressionList = [];
    this.ruleExpressionDTO.shortOrder = this.linecounter;
    this.ruleExpressionDTO.childrenColor = this.getRandomColor();
    this.ruleExpressionDTO.color = '#404040';

    if (this.selectedParentRuleExpressionDTO == null) {
      this.dto.ruleExpressionList.push(this.ruleExpressionDTO);
    } else {
      this.selectedParentRuleExpressionDTO.ruleExpressionList.push(this.ruleExpressionDTO);
     // this.ruleExpressionDTO.parrent = this.selectedParentRuleExpressionDTO;
    }

  }

  removeMenuFieldLine(selectedMenuFieldComponent: RuleExpressionDTO, menuFieldList: RuleExpressionDTO[]) {
    if (menuFieldList === undefined) {
      return;
    }

    if (menuFieldList.indexOf(selectedMenuFieldComponent) >= 0) {
      menuFieldList.splice(menuFieldList.indexOf(selectedMenuFieldComponent), 1);
    }

    for (const menuField of menuFieldList) {
      this.removeMenuFieldLine(selectedMenuFieldComponent, menuField.ruleExpressionList);
    }
  }

  upItemInList(baseDTO: BaseDTO, baseDTOs: BaseDTO[]) {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && position > 0) {
        const prevItem = baseDTOs[position - 1];
        baseDTOs[position] = prevItem;
        baseDTOs[position - 1] = listBaseDTO;
      }
      position++;
    }
  }

  downItemInList(baseDTO: BaseDTO, baseDTOs: BaseDTO[]) {
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
  }

  save() {
    this.dto.ruleExpressionList = this.updateShortOrderAndClearParrents(this.dto.ruleExpressionList);

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

  updateShortOrderAndClearParrents(ruleExpressionList: RuleExpressionDTO[]) {
    if (ruleExpressionList == null) {
      return null;
    }

    let shortOrder = 1;
    for (const ruleExpression of ruleExpressionList) {
      ruleExpression.shortOrder = shortOrder;
      ruleExpression.parrent = null;
      if (ruleExpression.ruleExpressionList != null) {
        ruleExpression.ruleExpressionList = this.updateShortOrderAndClearParrents(ruleExpression.ruleExpressionList);
      }
      shortOrder++;
    }
    return ruleExpressionList;
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  hasChildren(item: RuleExpressionDTO) {
    if (item.ruleExpressionList == null) {
      return false;
    }

    if (item.ruleExpressionList.length === 0) {
      return false;
    }

    return true;
  }

  hideChildren(item: RuleExpressionDTO) {
    item.expanded = false;
  }

  showChildren(item: RuleExpressionDTO) {
    item.expanded = true;
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  setRuleField(field: string) {
    this.ruleExpressionDTO.field = field;
  }

  setOperatorField(operator: string) {
    this.ruleExpressionDTO.operator = operator;
  }
}
