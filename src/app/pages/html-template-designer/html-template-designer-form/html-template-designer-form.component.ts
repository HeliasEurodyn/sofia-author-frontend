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
import { NotificationService } from 'app/services/system/notification.service';

@Component({
  selector: 'app-html-template-designer-form',
  templateUrl: './html-template-designer-form.component.html',
  styleUrls: ['./html-template-designer-form.component.css']
})
export class HtmlTemplateDesignerFormComponent extends PageComponent implements OnInit {
  [x: string]: any;

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
    private location: Location,
    private notificationService: NotificationService) {
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
        this.dto.html = decodeURIComponent(atob(this.dto?.html));
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.refreshComponents();
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
    const base64Html = btoa(encodeURIComponent(dtoToBeSaved?.html));
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

  download() {
    this.service.download(this.dto?.id).subscribe(response => {
      this.saveFile(response.body, "pdf");
    });
  }

  saveFile(downloadedData: any, reportType: string) {
    const blob = new Blob([downloadedData], {type: 'application/' + reportType});
    const url = window.URL.createObjectURL(blob);
    const downloadedReportFile = document.createElement('a');
    document.body.appendChild(downloadedReportFile);
    downloadedReportFile.setAttribute('style', 'display: none');
    downloadedReportFile.href = url;
    downloadedReportFile.download = 'report.' + reportType;
    downloadedReportFile.click();
    window.URL.revokeObjectURL(url);
    downloadedReportFile.remove();
  }

  hideChildren(item) {
    item.showFieldList = false;
  }

  showChildren(item) {
    item.showFieldList = true;
  }

  addColumn(componentPersistEntity, field){
    const fieldString = componentPersistEntity.code + '.' + field.persistEntityField.name;
    const fieldParameter = '##' + fieldString + '##';
    navigator.clipboard.writeText(fieldParameter).then().catch(e => console.log(e));

    this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-exclamation', 'Field <b>' + fieldString + '</b> copied to clipboard!');

    // console.log(fieldString);
    // this.dto.html += fieldString;

  }


}
