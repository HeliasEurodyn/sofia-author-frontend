import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageComponent} from '../../page/page-component';
import {InfoCardDTO} from '../../../../dtos/sofia/info-card/info-card-dto';
import {InfoCardDesignerService} from '../../../../services/crud/sofia/info-card-designer.service';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-info-card-designer-form',
  templateUrl: './info-card-designer-form.component.html',
  styleUrls: ['./info-card-designer-form.component.css']
})
export class InfoCardDesignerFormComponent extends PageComponent implements OnInit {

  public dto: InfoCardDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: InfoCardDesignerService,
              private navigatorService: CommandNavigatorService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new InfoCardDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = atob(this.dto.query);
        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {
    const dto = JSON.parse(JSON.stringify(this.dto));
    dto.query = btoa(this.dto.query);

    if (this.mode === 'edit-record') {
      this.service.update(dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dto).subscribe(data => {
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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  displayInfoCard() {
    // this.service.getData(this.dto.query).subscribe(cardTextResponce => {
    //   this.dto.cardText = cardTextResponce['cardText'];
    // });
  }

  openPage() {
    this.navigatorService.navigate(this.dto.command);
  }
}
