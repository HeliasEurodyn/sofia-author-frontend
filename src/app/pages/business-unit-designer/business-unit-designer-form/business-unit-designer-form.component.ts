import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {BusinessUnitDTO} from '../../../dtos/sofia/business-unit/business-unit-dto';
import {BusinessUnitDesignerService} from '../../../services/crud/business-unit-designer.service';

@Component({
  selector: 'app-business-unit-designer-form',
  templateUrl: './business-unit-designer-form.component.html',
  styleUrls: ['./business-unit-designer-form.component.css']
})
export class BusinessUnitDesignerFormComponent extends PageComponent implements OnInit {

  public dto: BusinessUnitDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: BusinessUnitDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new BusinessUnitDTO();

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
      console.log(this?.dto);
      this.service.update(this?.dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(this?.dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto?.id).subscribe(data => {
      this.location.back();
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }
}
