import { Component, OnInit } from '@angular/core';
import {RuleSettingsDTO} from "../../../dtos/rule/rule-settings-d-t-o";
import {ActivatedRoute, Router} from "@angular/router";
import {RuleDesignerService} from "../../../services/crud/rule-designer.service";
import {Location} from "@angular/common";
import {CommandNavigatorService} from "../../../services/system/command-navigator.service";
import {BaseDTO} from "../../../dtos/common/base-dto";
import {PageComponent} from "../../page/page-component";

@Component({
  selector: 'app-rule-designer-form',
  templateUrl: './rule-designer-form.component.html',
  styleUrls: ['./rule-designer-form.component.scss']
})
export class RuleDesignerFormComponent extends PageComponent implements OnInit {

  public dto: RuleSettingsDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: RuleDesignerService,
              private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new RuleSettingsDTO();

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

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        this.dto.id = null;
        this.dto.version = null;
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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

}
