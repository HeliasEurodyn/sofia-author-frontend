import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DashboardDTO} from '../../../dtos/dashboard/dashboard-dto';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {ActivatedRoute} from '@angular/router';
import {PageComponent} from '../../page/page-component';
import {DashboardService} from '../../../services/crud/dashboard.service';
import {Title} from '@angular/platform-browser';
import {ListComponent} from '../../list/list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends PageComponent implements OnInit {

  @ViewChildren('lists') lists: QueryList<ListComponent>;
  public dto: DashboardDTO = null;
  public extraParams = '';
  public extraParamsMap: Map<any, any>;

  constructor(
    private service: DashboardService,
    private navigatorService: CommandNavigatorService,
    private activatedRoute: ActivatedRoute,
    private title: Title) {
    super();
  }

  ngOnInit(): void {
      this.initNav(this.activatedRoute);
      this.refresh();
  }

  refresh(): void {

    let id = '0';
    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
    }

    this.extraParams = '';
    this.extraParamsMap = this.getParams('EXTRA-PARAMS');
    if ( this.extraParamsMap.size > 0) {
      this.extraParamsMap.forEach((value, key) => {
          this.extraParams += ',' + key + ':' + value;
      });
    }

    this.service.getById(id).subscribe(dto => {
      this.dto = dto;
      this.defineTitle();
    });
  }

  defineTitle() {
    if (this.commandShowCustomTitle()) {
      this.title.setTitle(this.getWindowCustomTitleFromCommand());
    }
  }

}
