import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../sofia/page/page-component';
import {CveSearchService} from '../../../services/crud/sofia/cve-search.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {NotificationService} from '../../../services/system/sofia/notification.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TableComponentService} from '../../../services/crud/sofia/table-component.service';
import {LoadingService} from '../../../services/system/sofia/loading.service';
import {Title} from '@angular/platform-browser';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-vendor-product-cpe-list',
  templateUrl: './vendor-product-cpe-list.component.html',
  styleUrls: ['./vendor-product-cpe-list.component.css']
})
export class VendorProductCpeListComponent extends PageComponent implements OnInit {


  public results: any[];
  public resultsInit: any[];
  public vendor: string;
  public product: string;
  public cpeFilter: string;
  public marginStyle = 'margin-top: 10px;';
  public loading = false;

  constructor(private service: CveSearchService,
              private commandNavigatorService: CommandNavigatorService,
              private notificationService: NotificationService,
              public datepipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private tableComponentService: TableComponentService,
              private loadingService: LoadingService,
              private title: Title) {
    super();
  }

  ngOnInit(): void {
   // this.activatedRoute.queryParamMap.subscribe(params => {
      this.initNav(this.activatedRoute);
      this.refresh();
      this.listenToLoading();
   // });
  }

  refresh(): void {
    this.defineTitle();
    this.defineDefaults();
    this.focusElement();
    this.defineVendorFilter();
    this.getListResultData();
  }

  defineDefaults() {
    const defaultsMap = this.commandParserService.parseMapPart(this.params, 'DEFAULTS');
    if (defaultsMap.has('VENDOR')) {
      this.vendor = defaultsMap.get('VENDOR');
    }

    if (defaultsMap.has('PRODUCT')) {
      this.product = defaultsMap.get('PRODUCT');
    }
  }

  getListResultData(): void {
    this.service.getVendorProductCpes(this.vendor, this.product).subscribe(data => {
      this.resultsInit = data;
      this.results = data;
    });
  }

  filterDataSet(): void {
    this.results = [];
    this.resultsInit.forEach(x => {
      if (x.includes(this.cpeFilter)) {
        this.results.push(x);
      }
    });
  }

  defineTitle() {
    if (this.commandShowCustomTitle()) {
      this.title.setTitle(this.getWindowCustomTitleFromCommand());
    }
  }

  defineVendorFilter() {
    if (this.params.has('CPE')) {
      this.cpeFilter = this.params.get('CPE');
    }
  }


  listButtonClick(row
                    :
                    string
  ) {
    this.emitReturningValues(row);
    return;
  }

  emitReturningValues(value) {
    const emitData = [];
    emitData['RETURN'] = value;
    this.selectEmmiter.emit(emitData);
  }

  columnFilterRefreshData(event
                            :
                            KeyboardEvent
  ) {
    if (event.ctrlKey && event.key === 'Enter') {

      if (this.results.length === 1) {
        const row = this.results[0];
        this.emitReturningValues(row);
      }
    }

    if (event.key === 'Enter') {
      this.filterDataSet();
    }
  }

  listenToLoading()
    :
    void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
