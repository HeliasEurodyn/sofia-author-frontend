import {Component, Input, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {TimelineService} from '../../../../services/crud/sofia/timeline.service';
import {TimelineResponseDTO} from '../../../../dtos/sofia/timeline/timeline-response-dto';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {TimelineContentDTO} from '../../../../dtos/sofia/timeline/timeline-content-dto';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent extends  PageComponent implements OnInit {

  public dto: TimelineResponseDTO = new TimelineResponseDTO();
  public extraParamsMap: Map<any, any>;
  public currentPage = 1
  public id = '0';
  public extraParams = '';
  public resultList: Array<TimelineContentDTO> = new Array<TimelineContentDTO>();

  constructor(private service: TimelineService,
              private activatedRoute: ActivatedRoute,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
       this.initNav(this.activatedRoute);
       this.buildParameters()
       this.refresh()

  }

  buildParameters(): void {
    this.extraParamsMap = this.getParams('extraparams');
    const locateParams = this.getLocateParams();

    if ( this.extraParamsMap != null) {
      this.extraParamsMap.forEach((value, key) => {
        this.extraParams += '&' +  encodeURI(key) + '=' +  encodeURI(value);
      });
    }

    if (locateParams.has('ID')) {
      this.id = locateParams.get('ID');
    }
  }


  refresh(): void {

    if (this.id !== '0') {
      this.service.getByIdWithParams(this.id, this.extraParams, this.currentPage).subscribe(data => {
        this.dto = data;
        this.resultList.push(...this.dto.resultList);
      });
    }
  }


  minTitleClicked(nav: string) {
    this.navigatorService.navigate(nav);
  }

  goToTheNextPage() {
    this.currentPage += 1;
    this.refresh();
  }

  test() {
    alert('this is a test')
  }
}
