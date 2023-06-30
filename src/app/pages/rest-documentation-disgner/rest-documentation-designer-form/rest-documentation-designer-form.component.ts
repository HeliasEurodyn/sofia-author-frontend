import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestDocumentationDTO } from 'app/dtos/rest-documentation/rest-documentation-dto';
import { PageComponent } from 'app/pages/page/page-component';
import { RestDocumentationDesignerService } from 'app/services/crud/rest-documentation-designer.service';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ListDesignerService } from 'app/services/crud/list-designer.service';
import { ListDTO } from 'app/dtos/list/list-dto';
import { RestDocumentationEndpoint } from 'app/dtos/rest-documentation/rest-documentation-endpoint';
import { RestDocumentationEndpointDTO } from 'app/dtos/rest-documentation/rest-documentation-endpoint/rest-documentation-endpoint-dto';
import { TableComponentDesignerService } from 'app/services/crud/table-component-designer.service';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import { FormDto } from 'app/dtos/form/form-dto';
import { FormDesignerService } from 'app/services/crud/form-designer.service';

@Component({
  selector: 'app-rest-documentation-designer-form',
  templateUrl: './rest-documentation-designer-form.component.html',
  styleUrls: ['./rest-documentation-designer-form.component.css']
})
export class RestDocumentationDesignerFormComponent extends PageComponent implements OnInit {

  public dto: RestDocumentationDTO;
  public lists: ListDTO[];
  public forms: FormDto[];
  list: ListDTO;
  form: FormDto;
  restDocumentationEndpoint: RestDocumentationEndpointDTO = null;
  public mode: string;
  public components: any;

  public textEditorConfig: AceConfigInterface = {
    mode: 'html',
    theme: 'chrome',
    readOnly: false
  };

  constructor(private activatedRoute: ActivatedRoute,
    private service: RestDocumentationDesignerService,
    private tableComponentService: TableComponentDesignerService,
    private location: Location,
    private listService: ListDesignerService,
    private formService: FormDesignerService,
    private httpClient: HttpClient) {
super();
}

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new RestDocumentationDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
      });
    }

    this.refreshComponents();
  }



  refreshComponents() {

    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    this.listService.get().subscribe(data => {
      this.lists = data;
    });

    this.formService.get().subscribe(data => {
      this.forms = data;
    });
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));

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



  
  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.mode = 'new-record';
      }
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  genNextShortOrder(componentsList: any[]) {
    if (componentsList === null
      || componentsList === undefined
      || componentsList.length === 0) {
      return 1;
    }

    const curShortOrderObject = componentsList.reduce(function (prev, curr) {
      return prev.shortOrder < curr.shortOrder ? curr : prev;
    });

    return (curShortOrderObject.shortOrder + 1);
  }

  addList(list: ListDTO) {

    if (this.dto.restDocumentationEndpoints == null) {
      this.dto.restDocumentationEndpoints = [];
    }

    const restDocumentationEndpoint = new RestDocumentationEndpoint();
    restDocumentationEndpoint.list = list;
    restDocumentationEndpoint.type = 'list';
    restDocumentationEndpoint.method = 'get';
    this.dto.restDocumentationEndpoints.push(restDocumentationEndpoint);
  }

  selectRestDocumentationEndpoint(restDocumentationEndpoint: RestDocumentationEndpoint) {
    this.restDocumentationEndpoint = restDocumentationEndpoint;
  }

  removeRestDocumentationEndpoint(restDocumentationEndpoint: RestDocumentationEndpoint) {
    this.dto.restDocumentationEndpoints = this.dto.restDocumentationEndpoints.filter(item => item !== restDocumentationEndpoint);
  }

  addForm(form: FormDto) {

    if (this.dto.restDocumentationEndpoints == null) {
      this.dto.restDocumentationEndpoints = [];
    }

    const restDocumentationEndpoint = new RestDocumentationEndpoint();
    restDocumentationEndpoint.form = form;
    restDocumentationEndpoint.type = 'form';
    restDocumentationEndpoint.method = 'post';
    this.dto.restDocumentationEndpoints.push(restDocumentationEndpoint);
  }

  selectForm(form: FormDto) {
    this.form = form;

    for (const restDocumentationEndpoint of this.dto.restDocumentationEndpoints) {
      if (restDocumentationEndpoint.form.id === form.id) {
        this.restDocumentationEndpoint = restDocumentationEndpoint;
      }
    }
  }


}
