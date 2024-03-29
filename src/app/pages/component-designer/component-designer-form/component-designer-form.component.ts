import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/crud/table.service';
import {ComponentDTO} from '../../../dtos/component/componentDTO';
import {TableDTO} from '../../../dtos/table/tableDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/component/component-persist-entity-field-dto';
import {ComponentPersistEntityDTO} from '../../../dtos/component/component-persist-entity-dto';
import {ViewService} from '../../../services/crud/view.service';
import {AppViewService} from '../../../services/crud/app-view.service';
import {Location} from '@angular/common';
import {TableComponentDesignerService} from '../../../services/crud/table-component-designer.service';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';

@Component({
  selector: 'app-component-designer-form',
  templateUrl: './component-designer-form.component.html',
  styleUrls: ['./component-designer-form.component.css']
})
export class ComponentDesignerFormComponent extends PageComponent implements OnInit {

  public tables: any;
  public views: any;
  public appViews: any;
  public visibleSection = 'settings';
  public componentDTO = new ComponentDTO();
  public selectedTableComponent: ComponentDTO;
  public selectedComponentPersistEntityField: ComponentPersistEntityFieldDTO = null;
  public selectedjoinPersistEntity: ComponentPersistEntityDTO = null;
  public selectedComponentPersistEntity: ComponentPersistEntityDTO = null;
  private selectedSecurityRow: AccessControlDto;
  public mode: string;
  public roles: any;
  tableDesign: TableDTO;
  tableComponentFieldList: ComponentPersistEntityFieldDTO[];
  public componentPersistEntityCodeMask = '0*';
  public componentPersistEntityCodePattern = { '0': { pattern: new RegExp('\[a-z0-9_\]')} };
  public componentPersistEntityFieldStatementsMask = '0*';
  public componentPersistEntityFieldStatementsPattern = { '0': { pattern: new RegExp('\\S')} };
  public tagsList: Array<TagDTO>;


  constructor(private tableService: TableService,
              private viewService: ViewService,
              private appViewService: AppViewService,
              private service: TableComponentDesignerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private roleService: RoleService,
              private navigatorService: CommandNavigatorService,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.componentDTO = new ComponentDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.componentDTO = data;
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.refreshComponents();
  }

  save() {
    this.shortFields(this.componentDTO.componentPersistEntityList);

    if (this.mode === 'edit-record') {
      this.service.update(this.componentDTO).subscribe(data => {
        this.location.back();
      });
    } else {
      this.service.save(this.componentDTO).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.tableDesign.id).subscribe(data => {
      this.location.back();
    });
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        this.componentDTO.id = null;
        this.componentDTO.version = null;
        for (const componentPersistEntity of this.componentDTO.componentPersistEntityList) {
          componentPersistEntity.id = null;
          componentPersistEntity.version = null;
          for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
            componentPersistEntityField.id = null;
            componentPersistEntityField.version = null;
          }
          if (componentPersistEntity.componentPersistEntityList != null) {
            this.cleanIdsIfCloneEnabledOnTree(componentPersistEntity.componentPersistEntityList);
          }
        }
        this.mode = 'new-record';
      }
    }
  }

  cleanIdsIfCloneEnabledOnTree(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    for (const componentPersistEntity of componentPersistEntityList) {
      componentPersistEntity.id = null;
      componentPersistEntity.version = null;
      for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
        componentPersistEntityField.id = null;
        componentPersistEntityField.version = null;
      }
      if (componentPersistEntity.componentPersistEntityList != null) {
        this.cleanIdsIfCloneEnabledOnTree(componentPersistEntity.componentPersistEntityList);
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

  refreshComponents() {
    this.tableService.get().subscribe(data => {
      this.tables = data;
    });

    this.viewService.get().subscribe(data => {
      this.views = data;
    });

    this.appViewService.get().subscribe(data => {
      this.appViews = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });

    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
  }


  selectView(row) {
    let persistEntity;
    this.viewService.getById(row?.id).subscribe(data => {
      persistEntity = data;
      const componentPersistEntityDTO = new ComponentPersistEntityDTO();
      componentPersistEntityDTO.persistEntity = persistEntity;
      componentPersistEntityDTO.showFieldList = false;
      componentPersistEntityDTO.deleteType = 'delete';
      componentPersistEntityDTO.code = this.genNextComponentCode(this.componentDTO.componentPersistEntityList, row.name);
      componentPersistEntityDTO.shortOrder = this.setShortOrders(this.componentDTO.componentPersistEntityList);
      componentPersistEntityDTO.componentPersistEntityFieldList = [];
      let shortOrder = 1;
      for (const viewDesignField of persistEntity.viewFieldList) {
        const componentTableFieldDTO = new ComponentPersistEntityFieldDTO();
        componentTableFieldDTO.persistEntityField = viewDesignField;
        componentTableFieldDTO.assignment.editor = '';
        componentTableFieldDTO.shortOrder = shortOrder;
        componentPersistEntityDTO.componentPersistEntityFieldList.push(componentTableFieldDTO);
        shortOrder++;
      }

      if (this.selectedComponentPersistEntity == null) {
        this.componentDTO.componentPersistEntityList.push(componentPersistEntityDTO);
      } else {
        if (this.selectedComponentPersistEntity.componentPersistEntityList == null) {
          this.selectedComponentPersistEntity.componentPersistEntityList = [];
        }
        this.selectedComponentPersistEntity.componentPersistEntityList.push(componentPersistEntityDTO);
      }
    })
  }

  selectAppView(row) {
    let persistEntity;
    this.appViewService.getById(row?.id).subscribe(data => {
      persistEntity = data;
      const componentPersistEntityDTO = new ComponentPersistEntityDTO();
      componentPersistEntityDTO.persistEntity = persistEntity;
      componentPersistEntityDTO.showFieldList = false;
      componentPersistEntityDTO.deleteType = 'delete';
      componentPersistEntityDTO.shortOrder = this.setShortOrders(this.componentDTO.componentPersistEntityList);
      componentPersistEntityDTO.code = this.genNextComponentCode(this.componentDTO.componentPersistEntityList, row.name);
      componentPersistEntityDTO.componentPersistEntityFieldList = [];
      let shortOrder = 1;
      for (const appViewDesignField of persistEntity.appViewFieldList) {
        const componentTableFieldDTO = new ComponentPersistEntityFieldDTO();
        componentTableFieldDTO.persistEntityField = appViewDesignField;
        componentTableFieldDTO.assignment.editor = '';
        componentTableFieldDTO.shortOrder = shortOrder;
        componentPersistEntityDTO.componentPersistEntityFieldList.push(componentTableFieldDTO);
        shortOrder++;
      }

      if (this.selectedComponentPersistEntity == null) {
        this.componentDTO.componentPersistEntityList.push(componentPersistEntityDTO);
      } else {
        if (this.selectedComponentPersistEntity.componentPersistEntityList == null) {
          this.selectedComponentPersistEntity.componentPersistEntityList = [];
        }
        this.selectedComponentPersistEntity.componentPersistEntityList.push(componentPersistEntityDTO);
      }
    })
  }

  selectTable(row) {
    let persistEntity;
    this.tableService.getById(row?.id).subscribe(data => {
      persistEntity = data;
      const componentPersistEntityDTO = new ComponentPersistEntityDTO();
      componentPersistEntityDTO.persistEntity = persistEntity;
      componentPersistEntityDTO.showFieldList = false;
      componentPersistEntityDTO.deleteType = 'delete';
      componentPersistEntityDTO.code = this.genNextComponentCode(this.componentDTO.componentPersistEntityList, row.name);
      componentPersistEntityDTO.shortOrder = this.setShortOrders(this.componentDTO.componentPersistEntityList);
      componentPersistEntityDTO.componentPersistEntityFieldList = [];
      let shortOrder = 1;
      for (const tableDesignField of persistEntity.tableFieldList) {
        const componentTableFieldDTO = new ComponentPersistEntityFieldDTO();
        componentTableFieldDTO.persistEntityField = tableDesignField;
        componentTableFieldDTO.assignment.editor = '';
        componentTableFieldDTO.shortOrder = shortOrder;
        componentPersistEntityDTO.componentPersistEntityFieldList.push(componentTableFieldDTO);
        shortOrder++;
      }

      if (this.selectedComponentPersistEntity == null) {
        this.componentDTO.componentPersistEntityList.push(componentPersistEntityDTO);
      } else {
        if (this.selectedComponentPersistEntity.componentPersistEntityList == null) {
          this.selectedComponentPersistEntity.componentPersistEntityList = [];
        }
        this.selectedComponentPersistEntity.componentPersistEntityList.push(componentPersistEntityDTO);
      }
    })
  }

  genNextComponentCode(componentsList: ComponentPersistEntityDTO[], defaultCode: string) {
    let prefixCount = 0;
    let code = defaultCode;

    while (true) {
      let codeAlreadyExists = false;
      for (const componentPersistEntity of componentsList) {
        if (componentPersistEntity.code === code) {
          codeAlreadyExists = true;
        }

        if (componentPersistEntity.componentPersistEntityList != null) {
          componentPersistEntity.componentPersistEntityList.forEach(x => {
            if (x.code === code) {
              codeAlreadyExists = true;
            }
          });
        }

        componentPersistEntity.componentPersistEntityFieldList.forEach(x => {
          if (x.joinPersistEntity != null) {
            if (x.joinPersistEntity.code === code) {
              codeAlreadyExists = true;
            }
          }
        });
      }

      if (codeAlreadyExists === false) {
        return code;
      }

      prefixCount++;
      code = defaultCode + '_' + prefixCount;
    }
  }

  removeComponentPersistEntity(componentPersistEntity: ComponentPersistEntityDTO, componentPersistEntityList: ComponentPersistEntityDTO[]) {
    if (componentPersistEntityList.indexOf(componentPersistEntity) >= 0) {
      componentPersistEntityList.splice(componentPersistEntityList.indexOf(componentPersistEntity), 1);
    }
    this.setShortOrders(this.componentDTO.componentPersistEntityList);
  }

  upItemInList(row: ComponentPersistEntityDTO, componentPersistEntityList: ComponentPersistEntityDTO[]) {
    if (componentPersistEntityList === undefined) {
      return;
    }

    if (componentPersistEntityList.indexOf(row) > 0) {
      const position = componentPersistEntityList.indexOf(row);
      const item = componentPersistEntityList[position];
      const prevItem = componentPersistEntityList[position - 1];
      componentPersistEntityList[position] = prevItem;
      componentPersistEntityList[position - 1] = item;
    }

    this.setShortOrders(componentPersistEntityList);
  }

  downItemInList(row: ComponentPersistEntityDTO, componentPersistEntityList: ComponentPersistEntityDTO[]) {
    if (componentPersistEntityList === undefined) {
      return;
    }

    if (componentPersistEntityList.indexOf(row) < componentPersistEntityList.length - 1) {

      const position = componentPersistEntityList.indexOf(row);
      const item = componentPersistEntityList[position];
      const prevItem = componentPersistEntityList[position + 1];
      componentPersistEntityList[position] = prevItem;
      componentPersistEntityList[position + 1] = item;
    }
    this.setShortOrders(componentPersistEntityList);
  }

  setShortOrders(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    return this.setShortOrdersOnTree(componentPersistEntityList, 1);
  }

  setShortOrdersOnTree(componentPersistEntityList: ComponentPersistEntityDTO[], shortOrder: number) {

    if (componentPersistEntityList === null
      || componentPersistEntityList === undefined
      || componentPersistEntityList.length === 0) {
      return shortOrder;
    }

    componentPersistEntityList.forEach(x => {
      x.shortOrder = shortOrder;
      shortOrder += 1;
    });

    componentPersistEntityList.forEach(x => {
      if (x.componentPersistEntityList != null) {
        shortOrder = this.setShortOrdersOnTree(x.componentPersistEntityList, shortOrder);
      }
    });

    return shortOrder;
  }

  hideChildren(item) {
    item.showFieldList = false;
  }

  showChildren(item) {
    item.showFieldList = true;
  }

  defineComponentCode(componentPersistEntityList: ComponentPersistEntityDTO[], componentPersistEntity: ComponentPersistEntityDTO) {
    const clonedComponentPersistEntityList = JSON.parse(JSON.stringify(componentPersistEntityList));
    const filteredComponentPersistEntityList = this.removeComponentFromFieldListTree(clonedComponentPersistEntityList, componentPersistEntity);
    return this.genNextComponentCode(filteredComponentPersistEntityList, componentPersistEntity.code);
  }

  removeComponentFromFieldListTree(componentPersistEntityList: ComponentPersistEntityDTO[],
                                   componentPersistEntity: ComponentPersistEntityDTO) {
    const filteredComponentPersistEntityList = componentPersistEntityList.filter(x => x.shortOrder !== componentPersistEntity.shortOrder);
    filteredComponentPersistEntityList.forEach(x => {
      if (x.componentPersistEntityList != null) {
        x.componentPersistEntityList = this.removeComponentFromFieldListTree(x.componentPersistEntityList, componentPersistEntity);
      }
    });
    return filteredComponentPersistEntityList;
  }

  cleanJoinPersistEntity(field: ComponentPersistEntityFieldDTO) {
    field.joinPersistEntity = null;
  }

  selectField(field: ComponentPersistEntityFieldDTO) {
    this.selectedComponentPersistEntityField = field;
  }

  selectPersistEntity(persistEntity: ComponentPersistEntityDTO) {
    this.selectedComponentPersistEntity = persistEntity;
  }

  selectJoinPersistEntity(joinPersistEntity: ComponentPersistEntityDTO) {
    this.selectedjoinPersistEntity = joinPersistEntity;
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  addRuleButton(securityList: AccessControlDto[]) {
    if (securityList == null) {
      securityList = [];
    }

    const dto = new AccessControlDto();
    dto.role = null;
    dto.createEntity = false;
    dto.updateEntity = false;
    dto.readEntity = false;
    dto.deleteEntity = false;
    dto.type = 'component';
    dto.entityId = this.componentDTO.id;

    securityList.push(dto);

    return securityList;
  }

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  selectRole(role) {
    this.selectedSecurityRow.role = role;
  }

  selectTag(selectedTag: TagDTO) {
      if(this.componentDTO.tags == null){
        this.componentDTO.tags = [];
      }
      this.componentDTO.tags.push(selectedTag);
    }

  deleteTagChipsLine(tag: TagDTO) {
    this.componentDTO.tags =
      this.componentDTO.tags.filter(item => item !== tag);
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

  shortFields(cpeList: ComponentPersistEntityDTO[]) {

    let shortOrder = 0;

    /* Sort CPE */
    for (const cpe of cpeList) {
      cpe.shortOrder = shortOrder;
      shortOrder++;
    }

    /* Sort CPEF of each CPE */
    for (const cpe of cpeList) {
      shortOrder = 0;
      for (const cpef of cpe.componentPersistEntityFieldList) {
        cpef.shortOrder = shortOrder;
        shortOrder++;
      }
    }

    /* Run shortFields for children CPEs */
    for (const cpe of cpeList) {
      this.shortFields(cpe.componentPersistEntityList);
    }

  }


}
