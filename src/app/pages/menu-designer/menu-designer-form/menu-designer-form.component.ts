import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../services/crud/menu.service';
import {MenuDTO, MenuFieldDTO} from '../../../dtos/menu/menuDTO';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {Location} from '@angular/common'
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';

@Component({
  selector: 'app-menu-designer-form',
  templateUrl: './menu-designer-form.component.html',
  styleUrls: ['./menu-designer-form.component.css']
})
export class MenuDesignerFormComponent extends PageComponent implements OnInit {

  public menuComponent: MenuDTO;
  public menuFieldComponent: MenuFieldDTO;
  public selectedParentMenuFieldComponent: MenuFieldDTO;
  linecounter = 0;
  public tableExists = false;
  public fieldListMode = 'insert';
  public mode: string;
  title = 'appBootstrap';
  public visibleSection = 'general';
  public isCollapsed = false;
  private selectedSecurityRow: AccessControlDto;
  public users: any;
  public userGroups: any;
  public roles: any;
  public tagsList: Array<TagDTO>;

  constructor(private activatedRoute: ActivatedRoute,
              private menuDesignerService: MenuService,
              private router: Router,
              private location: Location,
              private navigatorService: CommandNavigatorService,
              private roleService: RoleService,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.menuComponent = new MenuDTO();
    this.menuFieldComponent = new MenuFieldDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.menuDesignerService.getById(id).subscribe(data => {
        this.menuComponent = data;
        this.cleanIdsIfCloneEnabled();
      });
    }
    this.refreshComponents();
  }
  refreshComponents() {
    this.roleService.get().subscribe(data => {
      this.roles = data;
    });

    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
  }
  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.menuComponent.id = null;
        this.menuComponent.version = null;
        if (this.menuComponent.menuFieldList != null) {
          this.cleanFieldListIdsIfCloneEnabled(this.menuComponent.menuFieldList);
        }
        this.mode = 'new-record';
      }
    }
  }

  cleanFieldListIdsIfCloneEnabled(menuFieldList: MenuFieldDTO[]) {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        for (const menuField of menuFieldList) {
          menuField.id = null;
          menuField.version = null;
          if (menuField.menuFieldList != null) {
            this.cleanFieldListIdsIfCloneEnabled(menuField.menuFieldList);
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

  addChildMenuField(selectedParentMenuFieldComponent: MenuFieldDTO) {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = selectedParentMenuFieldComponent;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.fieldListMode = 'insert';
  }

  addMenuField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.fieldListMode = 'insert';
  }


  editExistingMenuField(selectedMenuFieldComponent: MenuFieldDTO) {
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = selectedMenuFieldComponent;
    this.fieldListMode = 'edit';
  }

  saveNewMenuItem() {
    if (this.selectedParentMenuFieldComponent == null) {
      this.menuComponent.menuFieldList.push(this.menuFieldComponent);
    } else {
      this.selectedParentMenuFieldComponent.menuFieldList.push(this.menuFieldComponent);
    }
  }

  removeMenuFieldLine(selectedMenuFieldComponent: MenuFieldDTO, menuFieldList: MenuFieldDTO[]) {
    if (menuFieldList === undefined) {
      return;
    }

    if (menuFieldList.indexOf(selectedMenuFieldComponent) >= 0) {
      menuFieldList.splice(menuFieldList.indexOf(selectedMenuFieldComponent), 1);
    }

    for (const menuField of menuFieldList) {
      this.removeMenuFieldLine(selectedMenuFieldComponent, menuField.menuFieldList);
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
    this.menuComponent.menuFieldList = this.updateShortOrder(this.menuComponent.menuFieldList);

    if (this.mode === 'edit-record') {
      this.menuDesignerService.update(this.menuComponent).subscribe(data => {
        this.location.back();
      });
    } else {
      this.menuDesignerService.save(this.menuComponent).subscribe(data => {
        this.location.back();
      });
    }
  }

  updateShortOrder(menuFieldList: MenuFieldDTO[]) {
    if (menuFieldList == null) {
      return null;
    }

    let shortOrder = 1;
    for (const menuField of menuFieldList) {
      menuField.shortOrder = shortOrder;
      if (menuField.menuFieldList != null) {
        menuField.menuFieldList = this.updateShortOrder(menuField.menuFieldList);
      }
      shortOrder++;
    }
    return menuFieldList;
  }

  delete() {
    this.menuDesignerService.delete(this.menuComponent.id).subscribe(data => {
      this.location.back();
    });
  }

  addLine() {
  }

  hasChildren(item: MenuFieldDTO) {
    if (item.menuFieldList == null) {
      return false;
    }

    if (item.menuFieldList.length === 0) {
      return false;
    }

    return true;
  }

  hideChildren(item: MenuFieldDTO) {
    item.expanded = false;
  }

  showChildren(item: MenuFieldDTO) {
    item.expanded = true;
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
    dto.type = 'menu';
    dto.entityId = this.menuComponent.id;

    securityList.push(dto);

    return securityList;
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }
  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }
  removeSecurity(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  selectRole(selectedUserGroup) {
    this.selectedSecurityRow.role = selectedUserGroup;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  selectTag(selectedTag: TagDTO) {
    if(this.menuComponent.tags == null){
      this.menuComponent.tags = [];
    }
    this.menuComponent.tags.push(selectedTag);
  }

  deleteTagChipsLine(tag: TagDTO) {
    this.menuComponent.tags =
      this.menuComponent.tags.filter(item => item !== tag);
  }

  addLogoutMenuField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Logout';
    this.menuFieldComponent.icon = 'fa-power-off';
    this.menuFieldComponent.command = '#logout#';
    this.fieldListMode = 'insert';
  }

  addSearchMenuField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Search';
    this.menuFieldComponent.icon = 'fa-search';
    this.menuFieldComponent.command = '{"COMMAND-TYPE":"POPUPPAGE","NAME":"search","POPUPTITLE":"Search For #Entities of the Application by code","LOCATE":{"ID":"search_uuid"},"VALUE":"##search##"}';
    this.fieldListMode = 'insert';
  }

  addLoaderMenuField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Loader';
    this.menuFieldComponent.icon = 'fa-spinner';
    this.menuFieldComponent.command = '#hidden-loader#';
    this.fieldListMode = 'insert';
  }

  addParrentMenuField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Folder';
    this.menuFieldComponent.icon = 'fa-folder';
    this.menuFieldComponent.command = '#parent-menu#';
    this.fieldListMode = 'insert';
  }

  addParrentMenuCollapseField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Folder Scroll';
    this.menuFieldComponent.icon = 'fa-folder';
    this.menuFieldComponent.command = '#parent-collapse#';
    this.fieldListMode = 'insert';
  }

  addListMenuCollapseField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'List';
    this.menuFieldComponent.icon = 'fa-list';
    this.menuFieldComponent.command = '{"COMMAND-TYPE":"LIST","LOCATE":{"ID":"list_uuid"}}';
    this.fieldListMode = 'insert';
  }

  addFormMenuCollapseField() {
    this.linecounter++;
    this.selectedParentMenuFieldComponent = null;
    this.menuFieldComponent = new MenuFieldDTO();
    this.menuFieldComponent.menuFieldList = [];
    this.menuFieldComponent.shortOrder = this.linecounter;
    this.menuFieldComponent.name = 'Form';
    this.menuFieldComponent.icon = 'fa-object-group';
    this.menuFieldComponent.command = '{"COMMAND-TYPE":"FORM","LOCATE":{"ID":"form_uuid"}}';
    this.fieldListMode = 'insert';
  }

}
