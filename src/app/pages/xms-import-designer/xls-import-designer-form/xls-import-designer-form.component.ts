import {Component, OnInit} from '@angular/core';
import {XlsImportDTO} from '../../../dtos/sofia/xls-import/xls-import-dto';
import {TableComponentDesignerService} from '../../../services/crud/sofia/table-component-designer.service';
import {XlsImportLineDTO} from '../../../dtos/sofia/xls-import/xls-import-line-dto';
import {XlsImportDesignerService} from '../../../services/crud/sofia/xls-import-designer.service';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/sofia/component/component-persist-entity-field-dto';
import {ComponentPersistEntityDTO} from '../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldAssignmentDTO} from '../../../dtos/sofia/component/component-persist-entity-field-assignment-dto';
import {AccessControlDto} from '../../../dtos/sofia/security/access-control-dto';
import {RoleService} from '../../../services/crud/sofia/role.service';
import 'brace';
import 'brace/mode/html'
import 'brace/theme/chrome'
import {AceConfigInterface} from 'ngx-ace-wrapper';

@Component({
  selector: 'app-xls-import-designer-form',
  templateUrl: './xls-import-designer-form.component.html',
  styleUrls: ['./xls-import-designer-form.component.css']
})
export class XlsImportDesignerFormComponent extends PageComponent implements OnInit {

  public dto: XlsImportDTO = new XlsImportDTO();
  public mode: string;
  public components: any;
  public visibleSection = 'general';
  private selectedSecurityRow: AccessControlDto;
  public roles: any;

  public aceHtmlEditorConfig: AceConfigInterface = {
    mode: 'html',
    theme: 'chrome',
    readOnly : false
  };



  constructor(private tableComponentService: TableComponentDesignerService,
              private service: XlsImportDesignerService,
              private location: Location,
              private roleService: RoleService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(dto => {
        this.dto = dto;

        const cpeList: ComponentPersistEntityDTO[] = this.treeToList(this.dto.component.componentPersistEntityList);
        cpeList.forEach( cpe => {
          cpe.componentPersistEntityFieldList.forEach( cpef => {
            cpef.assignment.defaultValue = atob((cpef.assignment.defaultValue == null ? '' : cpef.assignment.defaultValue));
          });
        });

      });
    } else {
      this.setDefaultValues();
    }

    this.refreshComponents();
  }

  setDefaultValues() {
    const defaultDescription = '<div class="row"><div class="col-md-12">\n' +
      'Select the Xls file by clicking on the <i class="fas fa-upload"></i> <b>box</b> below. <br>\n' +
      'Click on the <b>Run</b> <i class="fas fa-play"></i> header  button to execute. <br>\n' +
      '<br>\n';

    this.dto.description = defaultDescription;
  }

  refreshComponents() {
    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });
  }

  save() {
    const dto: XlsImportDTO = JSON.parse(JSON.stringify(this.dto));
    const cpeList: ComponentPersistEntityDTO[] = this.treeToList(dto.component.componentPersistEntityList);
    cpeList.forEach( cpe => {
      cpe.componentPersistEntityFieldList.forEach( cpef => {
        cpef.assignment.defaultValue = btoa((cpef.assignment.defaultValue == null ? '' : cpef.assignment.defaultValue));
      });
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

  private treeToList(cpeList: ComponentPersistEntityDTO[]): ComponentPersistEntityDTO[] {
    if (cpeList == null) {
      return null;
    }

    const newCpeList: ComponentPersistEntityDTO[] = [];

    cpeList
      .forEach(cpe => {
        newCpeList.push(cpe);
      });

    const newChildCpeList: ComponentPersistEntityDTO[] = [];
    newCpeList
      .forEach(newCpe => {
        const childCpeList: ComponentPersistEntityDTO[]  = this.treeToList(newCpe.componentPersistEntityList);
        newChildCpeList.push(...childCpeList);
      });

    newCpeList.push(...newChildCpeList);
    return newCpeList;
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  selectComponent(selectedComponent) {
    this.dto.component = selectedComponent;
    this.setAssignmentsToComponents();
  }

  setAssignmentsToComponents() {
    if (this.dto.component !== null) {
      this.setAssignmentsToComponentsTree(this.dto.component.componentPersistEntityList);
    }
  }

  setAssignmentsToComponentsTree(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    componentPersistEntityList.forEach(componentPersistEntity => {
      componentPersistEntity.componentPersistEntityFieldList.forEach(componentPersistEntityField => {
        if (componentPersistEntityField.assignment === null) {
          componentPersistEntityField.assignment = new ComponentPersistEntityFieldAssignmentDTO();
          componentPersistEntityField.assignment.type = componentPersistEntityField.persistEntityField.type;
        }
        if (componentPersistEntity.componentPersistEntityList != null) {
          this.setAssignmentsToComponentsTree(componentPersistEntity.componentPersistEntityList);
        }
      });
    });
  }

  removeXlsImportLine(xlsImportLine: XlsImportLineDTO) {
    if (this.dto !== undefined) {
      this.dto.xlsImportLineList =
        this.dto.xlsImportLineList.filter(item => item !== xlsImportLine);
    }
  }

  addNewXlsImportLine(code: string) {
    const xlsImportLine = new XlsImportLineDTO();
    xlsImportLine.code = code;
    this.dto.xlsImportLineList.push(xlsImportLine);
  }

  hideChildren(item) {
    item.showFieldList = false;
  }

  showChildren(item) {
    item.showFieldList = true;
  }

  addNewXlsImportLineByField(componentPersistEntity: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const code = componentPersistEntity.code + '.' + field.persistEntityField.name;
    this.addNewXlsImportLine(code);
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
    dto.type = 'form';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  selectRole(role) {
    this.selectedSecurityRow.role = role;
  }

}
