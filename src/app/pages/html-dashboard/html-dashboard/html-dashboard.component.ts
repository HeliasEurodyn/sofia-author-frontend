import {Component, Input, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {HtmlDashboardDTO} from '../../../dtos/sofia/html-dashboard/html-dashboard-dto';
import {HtmlDashboardService} from 'app/services/crud/sofia/html-dashboard.service';

@Component({
  selector: 'app-html-dashboard',
  templateUrl: './html-dashboard.component.html',
  styleUrls: ['./html-dashboard.component.css']
})
export class HtmlDashboardComponent implements OnInit {

  @Input() id: number;
  @Input() public extraParamsMap: Map<any, any>;
  public instanceId = uuid.v4();
  public dto: HtmlDashboardDTO;

  constructor(private service: HtmlDashboardService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getById(this.id).subscribe(dto => {
      this.dto = dto;
    });
  }

}
