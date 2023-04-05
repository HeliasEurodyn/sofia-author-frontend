import {Component, OnInit} from '@angular/core';
import {SearchDTO} from '../../../dtos/search/search-dto';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {SearchDesignerService} from '../../../services/crud/search-designer.service';
import {Location} from '@angular/common';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/sqlserver';
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';

@Component({
  selector: 'app-search-designer-form',
  templateUrl: './search-designer-form.component.html',
  styleUrls: ['./search-designer-form.component.css']
})
export class SearchDesignerFormComponent extends PageComponent implements OnInit {

  public dto: SearchDTO;
  public mode: string;
  public visibleSection = 'general';
  private selectedSecurityRow: AccessControlDto;
  public roles: any;
  public tagsList: Array<TagDTO>;

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: SearchDesignerService,
              private roleService: RoleService,
              private location: Location,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new SearchDTO();

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

  save() {
    const base64Query = btoa(encodeURIComponent(this.dto?.query));
    this.dto.query = base64Query;
    console.log(this.dto);

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

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.mode = 'new-record';
      }
    }
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
    dto.type = 'search designer';
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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
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
