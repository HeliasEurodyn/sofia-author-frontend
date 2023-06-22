import {Component, OnInit} from '@angular/core';
import {PageComponent} from "../../page/page-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {RuleOperatorDesignerService} from "../../../services/crud/rule-operator-designer.service";
import {RuleOperatorDTO} from "../../../dtos/rule/rule-operator-dto";

@Component({
  selector: 'app-rule-operator-designer-form',
  templateUrl: './rule-operator-designer-form.component.html',
  styleUrls: ['./rule-operator-designer-form.component.scss']
})
export class RuleOperatorDesignerFormComponent extends PageComponent implements OnInit {

  public dto: RuleOperatorDTO;
  public mode: string;
  public visibleSection = 'general';

  constructor(private activatedRoute: ActivatedRoute,
              private service: RuleOperatorDesignerService,
              private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new RuleOperatorDTO();

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
