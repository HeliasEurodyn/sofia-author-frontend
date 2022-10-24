import { Component, OnInit } from '@angular/core';
import {CustomQueryDTO} from '../../../dtos/customquery/custom-query-dto';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {ActivatedRoute} from '@angular/router';
import {CustomQueryDesignerService} from '../../../services/crud/custom-query-designer.service';
import {RoleService} from '../../../services/crud/role.service';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {LanguageDTO} from '../../../dtos/language/language-dto';
import {LanguageService} from '../../../services/crud/language.service';

@Component({
  selector: 'app-language-designer-form',
  templateUrl: './language-designer-form.component.html',
  styleUrls: ['./language-designer-form.component.css']
})
export class LanguageDesignerFormComponent extends PageComponent implements OnInit {


  public dto: LanguageDTO;
  public mode: string;
  public visibleSection = 'general';
  private selectedSecurityRow: AccessControlDto;

  constructor(private activatedRoute: ActivatedRoute,
              private service: LanguageService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new LanguageDTO();

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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

}
