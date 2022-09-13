import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {TimelineDesignerService} from '../../../../services/crud/sofia/timeline-designer.service';
import {TimelineDTO} from '../../../../dtos/sofia/timeline/timeline-dto';
import {Location} from '@angular/common';

@Component({
  selector: 'app-timeline-designer-form',
  templateUrl: './timeline-designer-form.component.html',
  styleUrls: ['./timeline-designer-form.component.css']
})
export class TimelineDesignerFormComponent extends PageComponent implements OnInit {

  public dto: TimelineDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: TimelineDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new TimelineDTO();

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
