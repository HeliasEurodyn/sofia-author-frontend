import {Component, Input, OnInit} from '@angular/core';
import {TimelineDesignerService} from '../../../../services/crud/sofia/timeline-designer.service';
import {PageComponent} from '../../page/page-component';
import {TimelineDTO} from '../../../../dtos/sofia/timeline/timeline-dto';
import {ActivatedRoute} from '@angular/router';
import {TimelineService} from '../../../../services/crud/sofia/timeline.service';
import {TimelineResponseDTO} from '../../../../dtos/sofia/timeline/timeline-response-dto';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent extends  PageComponent implements OnInit {

  public dto: TimelineResponseDTO;
  public extraParamsMap: Map<any, any>;

  constructor(private service: TimelineService,
              private activatedRoute: ActivatedRoute,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
       this.refresh()

  }

  refresh(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    let extraParams = '';
    this.dto = new TimelineResponseDTO();
    this.extraParamsMap = this.getParams('extraparams');
    const locateParams = this.getLocateParams();

    if ( this.extraParamsMap != null) {
      this.extraParamsMap.forEach((value, key) => {
        extraParams += '&' +  encodeURI(key) + '=' +  encodeURI(value);
      });
    }

    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.service.getByIdWithParams(id, extraParams).subscribe(data => {
         this.dto = data;
      });
    }
  }

  minTitleClicked(nav: string) {
    this.navigatorService.navigate(nav);
  }
}
