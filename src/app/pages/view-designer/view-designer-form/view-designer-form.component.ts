import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ViewService} from 'app/services/crud/view.service';
import {ViewDTO} from '../../../dtos/sofia/view/view-dto';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';

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

  constructor(private activatedRoute: ActivatedRoute,
              private service: ViewService,
              private router: Router,
              private navigatorService: CommandNavigatorService) {
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
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.dto.viewFieldList = [];
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
    if (this.mode === 'edit-record') {
      this.service.update(this.dto).subscribe(data => {
        this.navigatorService.closeAndBack(this.pageId);
      });
    } else {
      this.service.save(this.dto).subscribe(data => {
        this.navigatorService.closeAndBack(this.pageId);
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.navigatorService.closeAndBack(this.pageId);
    });
  }

  generateViewFields() {
    this.service.generateViewFields(this.dto.query).subscribe(data => {
      this.dto.viewFieldList = data;
    });
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
