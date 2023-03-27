import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {TagDesignerService} from '../../../services/crud/tag-designer.service';
import { TagDTO } from 'app/dtos/tag/tag-dto';

@Component({
  selector: 'app-tag-designer-form',
  templateUrl: './tag-designer-form.component.html',
  styleUrls: ['./tag-designer-form.component.css']
})
export class TagDesignerFormComponent extends PageComponent implements OnInit {

  public dto: TagDTO;
  public mode: string;
  public visibleSection = 'general';



  constructor(private activatedRoute: ActivatedRoute,
              private service: TagDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new TagDTO();

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

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.mode = 'new-record';
      }
    }
  }

}
