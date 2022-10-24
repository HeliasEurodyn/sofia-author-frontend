import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {TimelineService} from '../../../services/crud/timeline.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {TimelineContentDTO} from '../../../dtos/timeline/timeline-content-dto';
import {TimelineDTO} from '../../../dtos/timeline/timeline-dto';
import {concatMap, map} from 'rxjs/operators';
import {TimelineResponseDTO} from '../../../dtos/timeline/timeline-response-dto';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent extends PageComponent implements OnInit {

  public timelineResponseDTO: TimelineResponseDTO = new TimelineResponseDTO();
  public timelineDTO = new TimelineDTO();
  public extraParamsMap: Map<any, any>;
  public currentPage = 1
  public id = '0';
  public extraParams = '';
  public filterParams = '';
  public resultList: Array<TimelineContentDTO> = new Array<TimelineContentDTO>();

  constructor(private service: TimelineService,
              private activatedRoute: ActivatedRoute,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
    this.buildParameters()
    this.getTimelineHeader()
  }

  buildParameters(): void {
    this.extraParamsMap = this.getParams('extraparams');
    const locateParams = this.getLocateParams();

    if (this.extraParamsMap != null) {
      this.extraParamsMap.forEach((value, key) => {
        this.extraParams += '&' + encodeURI(key) + '=' + encodeURI(value);
      });
    }

    if (locateParams.has('ID')) {
      this.id = locateParams.get('ID');
    }
  }

  getTimelineHeader(): void {
    if (this.id !== '0') {
      this.service.getById(this.id).pipe(concatMap(timelineHeader => {
        this.timelineDTO = timelineHeader;
        this.generateFilterParams();
        return this.service
          .getByIdWithParams(this.id, this.extraParams + this.filterParams, this.currentPage)
          .pipe(map(timelineResponse => {
            this.timelineResponseDTO = timelineResponse;
            this.resultList.push(...this.timelineResponseDTO?.resultList);
          }));
      })).subscribe();
    }
  }

  refresh(): void {

    if (this.id !== '0') {
      this.service.getByIdWithParams(this.id, this.extraParams + this.filterParams, this.currentPage).subscribe(timelineResponse => {
        this.timelineResponseDTO = timelineResponse;
        this.resultList.push(...this.timelineResponseDTO?.resultList);
      });
    }
  }

  fieldEventOccurred(event: any) {
    if (['listselected', 'listcleared'].includes(event.eventtype)) {
      this.generateFilterParams();
      this.resultList = [];
      this.currentPage = 1;
      this.refresh();
    }
  }

  generateFilterParams() {
    this.filterParams = '';
    this.timelineDTO?.filterList.forEach(filter => {
      this.filterParams += '&' + encodeURI(filter.code) + '=' + encodeURI((filter.fieldValue == null ? '' : filter.fieldValue))
    });
  }


  minTitleClicked(nav: string) {
    this.navigatorService.navigate(nav);
  }

  goToTheNextPage() {
    this.currentPage += 1;
    this.refresh();
  }
}
