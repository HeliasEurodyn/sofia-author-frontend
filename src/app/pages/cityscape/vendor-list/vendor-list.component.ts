import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../sofia/page/page-component';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {NotificationService} from '../../../services/system/sofia/notification.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TableComponentService} from '../../../services/crud/sofia/table-component.service';
import {Title} from '@angular/platform-browser';
import {CveSearchService} from '../../../services/crud/sofia/cve-search.service';
import {delay} from 'rxjs/operators';
import {LoadingService} from '../../../services/system/sofia/loading.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends PageComponent implements OnInit {

  public results: any[];

  public marginStyle = 'margin-top: 10px;';
  public vendorFilter: string;
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
    this.focusElement();
    this.defineVendorFilter();
    this.getListResultData();
  }

  getListResultData(): void {
    if (this.vendorFilter === '') {
      this.results = [];
      return;
    }
    this.service.getVendors(this.vendorFilter).subscribe(data => {
      this.results = data;
    });
  }

  defineTitle() {
    if (this.commandShowCustomTitle()) {
      this.title.setTitle(this.getWindowCustomTitleFromCommand());
    }
  }

  defineVendorFilter() {
    if (this.params.has('VENTOR')) {
      this.vendorFilter = this.params.get('VENTOR');
    }
    this.vendorFilter = '';
  }


  listButtonClick(row: string) {
    this.emitReturningValues(row);
    return;
  }

  emitReturningValues(value) {
    const emitData = [];
    emitData['RETURN'] = value;
    this.selectEmmiter.emit(emitData);
  }

  columnFilterRefreshData(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {

      if (this.results.length === 1) {
        const row = this.results[0];
        this.emitReturningValues(row);
      }
    }

    if (event.key === 'Enter') {
      this.getListResultData();
    }
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
