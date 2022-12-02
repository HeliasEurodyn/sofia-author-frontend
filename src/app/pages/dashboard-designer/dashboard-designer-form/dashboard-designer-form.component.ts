import {Component, OnInit} from '@angular/core';
import {DashboardDTO} from '../../../dtos/dashboard/dashboard-dto';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ChartDesignerService} from '../../../services/crud/chart-designer.service';
import {ChartDTO} from '../../../dtos/chart/chart-dto';
import {DashboardItemDTO} from '../../../dtos/dashboard/dashboard-item-dto';
import {InfoCardDesignerService} from '../../../services/crud/info-card-designer.service';
import {InfoCardDTO} from '../../../dtos/info-card/info-card-dto';
import {DashboardDesignerService} from '../../../services/crud/dashboard-designer.service';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {PageComponent} from '../../page/page-component';
import {ListDTO} from '../../../dtos/list/list-dto';
import {DashboardAreaDTO} from '../../../dtos/dashboard/dashboard-area-dto';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {HtmlDashboardDTO} from '../../../dtos/html-dashboard/html-dashboard-dto';
import {HtmlDashboardDesignerService} from '../../../services/crud/html-dashboard-designer.service';
import {RoleService} from '../../../services/crud/role.service';
import {ListDesignerService} from '../../../services/crud/list-designer.service';

@Component({
  selector: 'app-dashboard-designer-form',
  templateUrl: './dashboard-designer-form.component.html',
  styleUrls: ['./dashboard-designer-form.component.css']
})
export class DashboardDesignerFormComponent extends PageComponent implements OnInit {

  public mode: string;
  public visibleSection = 'designer';
  public dto: DashboardDTO = new DashboardDTO();
  public charts: ChartDTO[];
  public infoCards: InfoCardDTO[];
  public htmlsDashboard: HtmlDashboardDTO[];
  public lists: ListDTO[];
  public dashboardArea: DashboardAreaDTO;
  private selectedSecurityRow: AccessControlDto;
  public roles: any;

  constructor(
    private service: DashboardDesignerService,
    private chartDesignerService: ChartDesignerService,
    private htmlDashboardService: HtmlDashboardDesignerService,
    private infoCardDesignerService: InfoCardDesignerService,
    private listService: ListDesignerService,
    private navigatorService: CommandNavigatorService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(dto => {
        this.dto = dto;
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.refreshCharts();
    this.refreshInfoCards();
    this.refreshLists();
    this.refreshRoles();
    this.refreshHtmlsDashboard();
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  refreshCharts() {
    this.chartDesignerService.get().subscribe(charts => {
      this.charts = charts;
    });
  }

  refreshInfoCards() {
    this.infoCardDesignerService.get().subscribe(infoCards => {
      this.infoCards = infoCards;
    });
  }

  refreshHtmlsDashboard() {
    this.htmlDashboardService.get().subscribe(htmlsDashboard => {
      this.htmlsDashboard = htmlsDashboard;
    });
  }

  refreshLists() {
    this.listService.get().subscribe(lists => {
      this.lists = lists;
    });
  }

  refreshRoles() {
    this.roleService.get().subscribe(data => {
      this.roles = data;
    });
  }

  addArea() {
    const dashboardArea = new DashboardAreaDTO();
    dashboardArea.cssclass = 'col-12';
    dashboardArea.cssStyle = '';
    dashboardArea.shortOrder = this.getNextShortOrder(this.dto.dashboardAreaList);
    if (this.dto.dashboardAreaList == null) {
      this.dto.dashboardAreaList = [];
    }
    this.dto.dashboardAreaList.push(dashboardArea);
  }

  addChart(chart: ChartDTO) {
    const dashboardItem = new DashboardItemDTO();
    dashboardItem.cssclass = 'col-12';
    dashboardItem.entityId = chart.id;
    dashboardItem.type = 'chart';
    dashboardItem.shortOrder = this.getNextShortOrder(this.dashboardArea.dashboardItemList);
    this.dashboardArea.dashboardItemList.push(dashboardItem);
  }

  addHtmlDashboard(htmlDashboard: any) {
    const dashboardItem = new DashboardItemDTO();
    dashboardItem.cssclass = 'col-12';
    dashboardItem.entityId = htmlDashboard.id;
    dashboardItem.type = 'html';
    dashboardItem.shortOrder = this.getNextShortOrder(this.dashboardArea.dashboardItemList);
    this.dashboardArea.dashboardItemList.push(dashboardItem);
  }

  addInfoCard(infoCard: InfoCardDTO) {
    const dashboardItem = new DashboardItemDTO();
    dashboardItem.cssclass = 'col-3';
    dashboardItem.entityId = infoCard.id;
    dashboardItem.type = 'infoCard';
    dashboardItem.shortOrder = this.getNextShortOrder(this.dashboardArea.dashboardItemList);
    this.dashboardArea.dashboardItemList.push(dashboardItem);
  }

  addList(list: ListDTO) {
    const dashboardItem = new DashboardItemDTO();
    dashboardItem.cssclass = 'col-12';
    dashboardItem.entityId = list.id;
    dashboardItem.type = 'list';
    dashboardItem.shortOrder = this.getNextShortOrder(this.dashboardArea.dashboardItemList);
    this.dashboardArea.dashboardItemList.push(dashboardItem);
  }


  moveUp(baseDTO: BaseDTO, baseDTOs: BaseDTO[]) {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && position > 0) {
        const prevItem = baseDTOs[position - 1];
        baseDTOs[position] = prevItem;
        baseDTOs[position - 1] = listBaseDTO;
      }
      position++;
    }
    this.updateShortOrders(baseDTOs);
  }

  moveDown(baseDTO: BaseDTO, baseDTOs: BaseDTO[]) {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && (position + 1) < baseDTOs.length) {
        const nextItem = baseDTOs[position + 1];
        baseDTOs[position] = nextItem;
        baseDTOs[position + 1] = listBaseDTO;
        break;
      }
      position++;
    }
    this.updateShortOrders(baseDTOs);
  }

  updateShortOrders(baseDTOs: BaseDTO[]) {
    let shortOrder = 0;
    for (const baseDTO of baseDTOs) {
      baseDTO.shortOrder = shortOrder;
      shortOrder++;
    }
  }

  getNextShortOrder(baseDTOs: BaseDTO[]) {
    if (baseDTOs === null
      || baseDTOs === undefined
      || baseDTOs.length === 0) {
      return 1;
    }

    const curShortOrderObject = baseDTOs.reduce(function (prev, curr) {
      return prev.shortOrder < curr.shortOrder ? curr : prev;
    });

    return (curShortOrderObject.shortOrder + 1);
  }

  removeEntityFormList(entity: any, list: any[]) {
    list =
      list.filter(item => item !== entity);
    return list;
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

  setSelectedArea(dashboardArea: DashboardAreaDTO) {
    this.dashboardArea = dashboardArea;
  }

  addSecurityButton(securityList: AccessControlDto[]) {
    if (securityList == null) {
      securityList = [];
    }

    const dto = new AccessControlDto();
    dto.role = null;
    dto.createEntity = false;
    dto.updateEntity = false;
    dto.readEntity = false;
    dto.deleteEntity = false;
    dto.type = 'form';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  removeSecurity(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  selectRole(role) {
    this.selectedSecurityRow.role = role;
  }

  addRuleButton(securityList: AccessControlDto[]) {
    if (securityList == null) {
      securityList = [];
    }

    const dto = new AccessControlDto();
    dto.role = null;
    dto.createEntity = false;
    dto.updateEntity = false;
    dto.readEntity = false;
    dto.deleteEntity = false;
    dto.type = 'form';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
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
