import { Component, OnInit } from '@angular/core';
import { CalendarDTO } from 'app/dtos/calendar/calendar-dto';
import {Location} from '@angular/common';
import { PageComponent } from 'app/pages/page/page-component';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/sqlserver';
import { ActivatedRoute } from '@angular/router';
import { CalendarDesignerService } from 'app/services/crud/calendar-designer.service';

@Component({
  selector: 'app-calendar-desginer-form',
  templateUrl: './calendar-desginer-form.component.html',
  styleUrls: ['./calendar-desginer-form.component.css']
})
export class CalendarDesginerFormComponent extends PageComponent implements OnInit {

  public dto: CalendarDTO;
  public mode : string;

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };

  constructor(private activatedRoute: ActivatedRoute,
    private service: CalendarDesignerService,
    private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new CalendarDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = decodeURIComponent(atob(this.dto?.query));
        this.cleanIdsIfCloneEnabled();
      });
    }
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
    const base64Query = decodeURIComponent(btoa(dtoToBeSaved?.query));
    dtoToBeSaved.query = base64Query;

    if (this.mode === 'edit-record') {
      console.log(dtoToBeSaved);
      this.service.update(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto?.id).subscribe(data => {
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

  }




