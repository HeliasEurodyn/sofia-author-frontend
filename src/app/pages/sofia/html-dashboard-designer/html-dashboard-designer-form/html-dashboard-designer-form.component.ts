import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CustomQueryDTO} from '../../../../dtos/sofia/customquery/custom-query-dto';
import {ActivatedRoute} from '@angular/router';
import {CustomQueryDesignerService} from '../../../../services/crud/sofia/custom-query-designer.service';
import {Location} from '@angular/common';
import {HtmlDashboardDTO} from '../../../../dtos/sofia/html-dashboard/html-dashboard-dto';
import {HtmlDashboardDesignerService} from '../../../../services/crud/sofia/html-dashboard-designer.service';

@Component({
  selector: 'app-html-dashboard-designer-form',
  templateUrl: './html-dashboard-designer-form.component.html',
  styleUrls: ['./html-dashboard-designer-form.component.css']
})
export class HtmlDashboardDesignerFormComponent extends PageComponent implements OnInit {

  public dto: HtmlDashboardDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: HtmlDashboardDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new HtmlDashboardDTO();

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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }


}
