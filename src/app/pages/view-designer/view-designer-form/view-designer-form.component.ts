import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ViewService} from 'app/services/crud/view.service';
import {ViewDTO} from '../../../dtos/view/view-dto';
import {PageComponent} from '../../page/page-component';
import {Location} from "@angular/common";
import {ViewFieldDTO} from "../../../dtos/view/view-field-dto";
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';
import { AceConfigInterface } from 'ngx-ace-wrapper';

@Component({
  selector: 'app-view-designer-form',
  templateUrl: './view-designer-form.component.html',
  styleUrls: ['./view-designer-form.component.css']
})
export class ViewDesignerFormComponent extends PageComponent implements OnInit {
  public dto: ViewDTO;
  shortOrder = 0;
  public tableExists = false;
  public mode: string;
  public customTableNameMask = '0*';
  public customTableNamePattern = { '0': { pattern: new RegExp('\[a-z0-9_\]')} };
  public tagsList: Array<TagDTO>;

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };
  
  constructor(private activatedRoute: ActivatedRoute,
              private service: ViewService,
              private router: Router,
              private location: Location,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new ViewDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = decodeURIComponent(atob(this.dto?.query));
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.dto.viewFieldList = [];
    this.refreshTags();
  }

  refreshTags(){
    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        for (const viewField of this.dto.viewFieldList) {
          viewField.id = null;
          viewField.version = null;
        }
        this.mode = 'new-record';
      }
    }
  }

  save() {

    const base64Query = btoa(encodeURIComponent(this.dto?.query));
    this.dto.query = base64Query;

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

  generateViewFields() {
    this.service.generateViewFields(this.dto.query).subscribe(data => {
      const genAppViewFieldList = this.replaceViewFieldIds(data);
      this.dto.viewFieldList = genAppViewFieldList;
    });
  }

  replaceViewFieldIds( genAppViewFieldList: ViewFieldDTO[]): ViewFieldDTO[] {
    genAppViewFieldList.forEach(genField => {
      const existingAppViewFieldList = this.dto.viewFieldList.filter(field => field.name === genField.name);
      if (existingAppViewFieldList.length > 0) {
        genField.id = existingAppViewFieldList[0].id;
        genField.primaryKey = existingAppViewFieldList[0].primaryKey;
      } else {
        genField.primaryKey = false;
      }
    });
    return genAppViewFieldList;
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
  }

  selectTag(selectedTag: TagDTO) {
    if(this.dto.tags == null){
      this.dto.tags = [];
    }
    this.dto.tags.push(selectedTag);
  }

  deleteTagChipsLine(tag: TagDTO) {
    this.dto.tags =
      this.dto.tags.filter(item => item !== tag);
  }

}
