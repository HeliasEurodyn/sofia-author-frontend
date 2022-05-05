import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {FormDesignerService} from '../../../../services/crud/sofia/form-designer.service';
import {DataTransferDTO} from '../../../../dtos/sofia/data_transfer/data-transfer-dto';
import {ListDesignerService} from '../../../../services/crud/sofia/list-designer.service';
import {DataTransferService} from '../../../../services/crud/sofia/data-transfer.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TableService} from '../../../../services/crud/sofia/table.service';
import {ViewService} from '../../../../services/crud/sofia/view.service';
import {AppViewService} from '../../../../services/crud/sofia/app-view.service';
import {MenuService} from '../../../../services/crud/sofia/menu.service';
import {TableComponentDesignerService} from '../../../../services/crud/sofia/table-component-designer.service';
import {LanguageService} from '../../../../services/crud/sofia/language.service';
import {RoleService} from '../../../../services/crud/sofia/role.service';
import {UserService} from '../../../../services/crud/sofia/user.service';
import {ChartDesignerService} from '../../../../services/crud/sofia/chart-designer.service';
import {ReportDesignerService} from '../../../../services/crud/sofia/report-designer.service';
import {DashboardDesignerService} from '../../../../services/crud/sofia/dashboard-designer.service';
import {HtmlDashboardDesignerService} from '../../../../services/crud/sofia/html-dashboard-designer.service';
import {XlsImportDesignerService} from '../../../../services/crud/sofia/xls-import-designer.service';
import {SearchDesignerService} from '../../../../services/crud/sofia/search-designer.service';
import {CustomQueryDesignerService} from '../../../../services/crud/sofia/custom-query-designer.service';
import {InfoCardDesignerService} from '../../../../services/crud/sofia/info-card-designer.service';

@Component({
  selector: 'app-sofia-import-export-form',
  templateUrl: './data-transfer-form.component.html',
  styleUrls: ['./data-transfer-form.component.css']
})
export class DataTransferFormComponent extends PageComponent implements OnInit {

  id = '';

  public formList: any;
  public listList: any;
  public menusList: any;
  public componentsList: any;
  public tableList: any;
  public viewList: any;
  public appViewList: any;
  public chartsList: any;
  public infoCardsList: any;
  public htmlPartsList: any;
  public dashboardsList: any;
  public reportsList: any;
  public xlsImportsList: any;
  public searchesList: any;
  public customQueriesList: any;
  public languagesList: any;
  public rolesList: any;
  public usersList: any;

  public visibleSection = 'general';
  public dto: DataTransferDTO = new DataTransferDTO();

  constructor(private service: DataTransferService,
              private formService: FormDesignerService,
              private listService: ListDesignerService,
              private menuService: MenuService,
              private componentService: TableComponentDesignerService,
              private tableService: TableService,
              private viewService: ViewService,
              private chartService: ChartDesignerService,
              private infoCardService: InfoCardDesignerService,
              private htmlDashboardService: HtmlDashboardDesignerService,
              private dashboardsService: DashboardDesignerService,
              private reportsService: ReportDesignerService,
              private xlsImportsService: XlsImportDesignerService,
              private searchesService: SearchDesignerService,
              private customQueriesService: CustomQueryDesignerService,
              private languagesService: LanguageService,
              private rolesService: RoleService,
              private usersService: UserService,
              private appViewService: AppViewService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);


    let mode = 'new-record';
    this.dto = new DataTransferDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      this.id = locateParams.get('ID');
      mode = 'edit-record';
    }

    if (mode === 'edit-record') {
      this.refresh();
    } else {
      this.refreshTables();
    }

  }

  refresh() {
    this.service.getById(this.id)
      .subscribe(data => {
        this.dto = data;

        this.refreshTables();
      });
  }

  refreshTables() {
    const formIds = (this.dto.formIds == null ? [] : this.dto.formIds);
    this.formService.get().subscribe(data => {
      this.formList = data;

      this.formList.forEach(row => {
        if (formIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const listIds = (this.dto.listIds == null ? [] : this.dto.listIds);
    this.listService.get().subscribe(data => {
      this.listList = data;

      this.listList.forEach(row => {
        if (listIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const menuIds = (this.dto.menuIds == null ? [] : this.dto.menuIds);
    this.menuService.get().subscribe(data => {
      this.menusList = data;
      this.menusList.forEach(row => {
        if (menuIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const componentIds = (this.dto.componentIds == null ? [] : this.dto.componentIds);
    this.componentService.get().subscribe(data => {
      this.componentsList = data;
      this.componentsList.forEach(row => {
        if (componentIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const tableIds = (this.dto.tableIds == null ? [] : this.dto.tableIds);
    this.tableService.get().subscribe(data => {
      this.tableList = data;

      this.tableList.forEach(row => {
        if (tableIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const viewIds = (this.dto.viewIds == null ? [] : this.dto.viewIds);
    this.viewService.get().subscribe(data => {
      this.viewList = data;

      this.viewList.forEach(row => {
        if (viewIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const appViewIds = (this.dto.appViewIds == null ? [] : this.dto.appViewIds);
    this.appViewService.get().subscribe(data => {
      this.appViewList = data;

      this.appViewList.forEach(row => {
        if (appViewIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const chartIds = (this.dto.chartIds == null ? [] : this.dto.chartIds);
    this.chartService.get().subscribe(data => {
      this.chartsList = data;

      this.chartsList.forEach(row => {
        if (chartIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const infoCardIds = (this.dto.infoCardIds == null ? [] : this.dto.infoCardIds);
    this.infoCardService.get().subscribe(data => {
      this.infoCardsList = data;

      this.infoCardsList.forEach(row => {
        if (infoCardIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const htmlPartIds = (this.dto.htmlPartIds == null ? [] : this.dto.htmlPartIds);
    this.htmlDashboardService.get().subscribe(data => {
      this.htmlPartsList = data;

      this.htmlPartsList.forEach(row => {
        if (htmlPartIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const dashboardIds = (this.dto.dashboardIds == null ? [] : this.dto.dashboardIds);
    this.dashboardsService.get().subscribe(data => {
      this.dashboardsList = data;

      this.dashboardsList.forEach(row => {
        if (dashboardIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const reportIds = (this.dto.reportIds == null ? [] : this.dto.reportIds);
    this.reportsService.get().subscribe(data => {
      this.reportsList = data;

      this.reportsList.forEach(row => {
        if (reportIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const xlsImportIds = (this.dto.xlsImportIds == null ? [] : this.dto.xlsImportIds);
    this.xlsImportsService.get().subscribe(data => {
      this.xlsImportsList = data;
      this.xlsImportsList.forEach(row => {
        if (xlsImportIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const searchIds = (this.dto.searchIds == null ? [] : this.dto.searchIds);
    this.searchesService.get().subscribe(data => {
      this.searchesList = data;

      this.searchesList.forEach(row => {
        if (searchIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const customQueryIds = (this.dto.customQueryIds == null ? [] : this.dto.customQueryIds);
    this.customQueriesService.get().subscribe(data => {
      this.customQueriesList = data;

      this.customQueriesList.forEach(row => {
        if (customQueryIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const languageIds = (this.dto.languageIds == null ? [] : this.dto.languageIds);
    this.languagesService.get().subscribe(data => {
      this.languagesList = data;

      this.languagesList.forEach(row => {
        if (languageIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const roleIds = (this.dto.roleIds == null ? [] : this.dto.roleIds);
    this.rolesService.get().subscribe(data => {
      this.rolesList = data;

      this.rolesList.forEach(row => {
        if (roleIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

    const userIds = (this.dto.userIds == null ? [] : this.dto.userIds);
    this.usersService.get().subscribe(data => {
      this.usersList = data;

      this.usersList.forEach(row => {
        if (userIds.indexOf(row['id']) !== -1) {
          row['checked'] = true;
        }
      });
    });

  }

  save() {

    this.dto.formIds = [];
    this.formList.forEach(row => {
      if (row['checked']) {
        this.dto.formIds.push(row.id);
      }
    });

    this.dto.listIds = [];
    this.listList.forEach(row => {
      if (row['checked']) {
        this.dto.listIds.push(row.id);
      }
    });

    this.dto.tableIds = [];
    this.tableList.forEach(row => {
      if (row['checked']) {
        this.dto.tableIds.push(row.id);
      }
    });

    this.dto.viewIds = [];
    this.viewList.forEach(row => {
      if (row['checked']) {
        this.dto.viewIds.push(row.id);
      }
    });

    this.dto.appViewIds = [];
    this.appViewList.forEach(row => {
      if (row['checked']) {
        this.dto.appViewIds.push(row.id);
      }
    });

    this.dto.chartIds = [];
    this.chartsList.forEach(row => {
      if (row['checked']) {
        this.dto.chartIds.push(row.id);
      }
    });

    this.dto.infoCardIds = [];
    this.infoCardsList.forEach(row => {
      if (row['checked']) {
        this.dto.infoCardIds.push(row.id);
      }
    });

    this.dto.htmlPartIds = [];
    this.htmlPartsList.forEach(row => {
      if (row['checked']) {
        this.dto.htmlPartIds.push(row.id);
      }
    });

    this.dto.dashboardIds = [];
    this.dashboardsList.forEach(row => {
      if (row['checked']) {
        this.dto.dashboardIds.push(row.id);
      }
    });

    this.dto.reportIds = [];
    this.reportsList.forEach(row => {
      if (row['checked']) {
        this.dto.reportIds.push(row.id);
      }
    });

    this.dto.xlsImportIds = [];
    this.xlsImportsList.forEach(row => {
      if (row['checked']) {
        this.dto.xlsImportIds.push(row.id);
      }
    });

    this.dto.searchIds = [];
    this.searchesList.forEach(row => {
      if (row['checked']) {
        this.dto.searchIds.push(row.id);
      }
    });

    this.dto.customQueryIds = [];
    this.customQueriesList.forEach(row => {
      if (row['checked']) {
        this.dto.customQueryIds.push(row.id);
      }
    });

    this.dto.languageIds = [];
    this.languagesList.forEach(row => {
      if (row['checked']) {
        this.dto.languageIds.push(row.id);
      }
    });

    this.dto.roleIds = [];
    this.rolesList.forEach(row => {
      if (row['checked']) {
        this.dto.roleIds.push(row.id);
      }
    });

    this.dto.userIds = [];
    this.usersList.forEach(row => {
      if (row['checked']) {
        this.dto.userIds.push(row.id);
      }
    });

    this.dto.menuIds = [];
    this.menusList.forEach(row => {
      if (row['checked']) {
        this.dto.menuIds.push(row.id);
      }
    });

    this.dto.componentIds = [];
    this.componentsList.forEach(row => {
      if (row['checked']) {
        this.dto.componentIds.push(row.id);
      }
    });

    this.service.save(this.dto).subscribe(data => {
      this.location.back();
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }
}
