import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {AppViewDTO} from '../../../../dtos/sofia/appview/app-view-dto';
import {AppViewService} from '../../../../services/crud/sofia/app-view.service';
import {Location} from '@angular/common';
import {AppViewFieldDTO} from '../../../../dtos/sofia/appview/app-view-field-dto';

@Component({
  selector: 'app-app-view-designer-form',
  templateUrl: './app-view-designer-form.component.html',
  styleUrls: ['./app-view-designer-form.component.css']
})
export class AppViewDesignerFormComponent extends PageComponent implements OnInit {

  public dto: AppViewDTO;
  shortOrder = 0;
  public tableExists = false;
  public mode: string;
  public customTableNameMask = '0*';
  public customTableNamePattern = { '0': { pattern: new RegExp('\[a-z0-9_\]')} };

  constructor(private activatedRoute: ActivatedRoute,
              private service: AppViewService,
              private router: Router,
              private location: Location,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new AppViewDTO();

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

    this.dto.appViewFieldList = [];
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        for (const appViewField of this.dto.appViewFieldList) {
          appViewField.id = null;
          appViewField.version = null;
        }
        this.mode = 'new-record';
      }
    }
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

  generateViewFields() {
    this.service.generateViewFields(this.dto.query).subscribe(data => {
      const genAppViewFieldList = this.replaceViewFieldIds(data);
      this.dto.appViewFieldList = genAppViewFieldList;
    });
  }

  replaceViewFieldIds( genAppViewFieldList: AppViewFieldDTO[]): AppViewFieldDTO[] {
    genAppViewFieldList.forEach(genField => {
      const existingAppViewFieldList = this.dto.appViewFieldList.filter(field => field.name === genField.name);
      if (existingAppViewFieldList.length > 0) {
        genField.id = existingAppViewFieldList[0].id;
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

  navigateToPreviousPage() {
    this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

}
