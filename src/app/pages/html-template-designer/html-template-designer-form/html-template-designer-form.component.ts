import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HtmlTemplateDTO } from 'app/dtos/html-template/html-template-dto';
import { PageComponent } from 'app/pages/page/page-component';
import { HtmlTemplateDesignerService } from 'app/services/crud/html-template-designer.service';
import {Location} from '@angular/common';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/html';
import 'brace/theme/chrome';
import { TableComponentDesignerService } from 'app/services/crud/table-component-designer.service';
import { ComponentPersistEntityDTO } from 'app/dtos/component/component-persist-entity-dto';
import { ComponentPersistEntityFieldAssignmentDTO } from 'app/dtos/component/component-persist-entity-field-assignment-dto';
import { RoleService } from 'app/services/crud/role.service';

@Component({
  selector: 'app-html-template-designer-form',
  templateUrl: './html-template-designer-form.component.html',
  styleUrls: ['./html-template-designer-form.component.css']
})
export class HtmlTemplateDesignerFormComponent extends PageComponent implements OnInit {

  public dto: HtmlTemplateDTO;
  public mode : string;
  public components: any;
  public roles: any;

  public aceHTMLEditorConfig: AceConfigInterface = {
    mode: 'html',
    theme: 'chrome',
    readOnly : false
  };


  constructor(private activatedRoute: ActivatedRoute,
    private tableComponentService: TableComponentDesignerService,
    private service: HtmlTemplateDesignerService,
    private roleService: RoleService,
    private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new HtmlTemplateDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.html = atob(this.dto?.html);
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.refreshComponents();
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
    const base64Html = btoa(dtoToBeSaved?.html);
    dtoToBeSaved.html = base64Html;
    console.log(this.dto);
    if (this.mode === 'edit-record') {
      console.log(dtoToBeSaved);
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
    this.service.delete(this.dto?.id).subscribe(data => {
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

  selectComponent(selectedComponent) {
    this.tableComponentService.getById(selectedComponent.id).subscribe(data => {
      this.dto.component = data;
      this.setAssignmentsToComponents();
    });
  }

  setAssignmentsToComponents() {
    if (this.dto.component !== null) {
      this.setAssignmentsToComponentsTree(this.dto?.component?.componentPersistEntityList);
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

  refreshComponents() {
    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    
  }

  

}
