import {Routes} from '@angular/router';

import {UserComponent} from '../../pages/sofia/user/user.component';
import {TableComponent} from '../../pages/sofia/table/table.component';
import {TypographyComponent} from '../../pages/demos/typography/typography.component';
import {IconsComponent} from '../../pages/demos/icons/icons.component';
import {MapsComponent} from '../../pages/demos/maps/maps.component';
import {NotificationsComponent} from '../../pages/demos/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/demos/upgrade/upgrade.component';
import {TableDesignerListComponent} from '../../pages/sofia/table-designer/table-designer-list/table-designer-list.component';
import {TableDesignerFormComponent} from '../../pages/sofia/table-designer/table-designer-form/table-designer-form.component';
import {MenuDesignerListComponent} from '../../pages/sofia/menu-designer/menu-designer-list/menu-designer-list.component';
import {MenuDesignerFormComponent} from '../../pages/sofia/menu-designer/menu-designer-form/menu-designer-form.component';
import {ListDesignerListComponent} from '../../pages/sofia/list-designer/list-designer-list/list-designer-list.component';
import {ListDesignerFormComponent} from '../../pages/sofia/list-designer/list-designer-form/list-designer-form.component';
import {ComponentDesignerFormComponent} from '../../pages/sofia/component-designer/component-designer-form/component-designer-form.component';
import {ComponentDesignerListComponent} from '../../pages/sofia/component-designer/component-designer-list/component-designer-list.component';
import {ViewDesignerListComponent} from '../../pages/sofia/view-designer/view-designer-list/view-designer-list.component';
import {ViewDesignerFormComponent} from '../../pages/sofia/view-designer/view-designer-form/view-designer-form.component';
import {ListComponent} from '../../pages/sofia/list/list/list.component';
import {NavigatorComponent} from '../../pages/demos/navigator/navigator.component';
import {CommandNavigatorService} from '../../services/system/sofia/command-navigator.service';
import {AppViewDesignerListComponent} from '../../pages/sofia/appview-designer/app-view-designer-list/app-view-designer-list.component';
import {AppViewDesignerFormComponent} from '../../pages/sofia/appview-designer/app-view-designer-form/app-view-designer-form.component';
import {UserFormComponent} from '../../pages/sofia/user/user-form/user-form.component';
import {UserListComponent} from '../../pages/sofia/user/user-list/user-list.component';
import {FormDesignerListComponent} from '../../pages/sofia/form-designer/form-designer-list/form-designer-list.component';
import {FormDesignerFormComponent} from '../../pages/sofia/form-designer/form-designer-form/form-designer-form.component';
import {FormComponent} from '../../pages/sofia/form/form/form.component';
import {ChartDesignerFormComponent} from '../../pages/sofia/chart-designer/chart-designer-form/chart-designer-form.component';
import {ChartDesignerListComponent} from '../../pages/sofia/chart-designer/chart-designer-list/chart-designer-list.component';
import {InfoCardDesignerFormComponent} from '../../pages/sofia/info-card-designer/info-card-designer-form/info-card-designer-form.component';
import {InfoCardDesignerListComponent} from '../../pages/sofia/info-card-designer/info-card-designer-list/info-card-designer-list.component';
import {DashboardDesignerFormComponent} from '../../pages/sofia/dashboard-designer/dashboard-designer-form/dashboard-designer-form.component';
import {DashboardDesignerListComponent} from '../../pages/sofia/dashboard-designer/dashboard-designer-list/dashboard-designer-list.component';
import {EmptyComponent} from '../../pages/sofia/empty/empty.component';
import {DashboardComponent} from '../../pages/sofia/dashboard/dashboard/dashboard.component';
import {ReportDesignerFormComponent} from '../../pages/sofia/report-designer/report-designer-form/report-designer-form.component';
import {ReportDesignerListComponent} from '../../pages/sofia/report-designer/report-designer-list/report-designer-list.component';
import {XlsImportDesignerFormComponent} from '../../pages/sofia/xms-import-designer/xls-import-designer-form/xls-import-designer-form.component';
import {XlsImportDesignerListComponent} from '../../pages/sofia/xms-import-designer/xls-import-designer-list/xls-import-designer-list.component';
import {XlsImportComponent} from '../../pages/sofia/xls-import/xls-import.component';
import {SearchDesignerListComponent} from '../../pages/sofia/search-designer/search-designer-list/search-designer-list.component';
import {SearchDesignerFormComponent} from '../../pages/sofia/search-designer/search-designer-form/search-designer-form.component';
import {SearchComponent} from '../../pages/sofia/search/search/search.component';
import {CveSearchComponent} from '../../pages/cityscape/cve-search/cve-search.component';
import {VendorListComponent} from '../../pages/cityscape/vendor-list/vendor-list.component';
import {VendorProductListComponent} from '../../pages/cityscape/vendor-product-list/vendor-product-list.component';
import {VendorProductCpeListComponent} from '../../pages/cityscape/vendor-product-cpe-list/vendor-product-cpe-list.component';
import {CveSearchSettingsComponent} from '../../pages/cityscape/cve-search-settings/cve-search-settings.component';
import {UserGroupListComponent} from '../../pages/sofia/usergroup/user-group-list/user-group-list.component';
import {UserGroupFormComponent} from '../../pages/sofia/usergroup/user-group-form/user-group-form.component';
import { CustomQueryListComponent } from 'app/pages/sofia/custom-query/custom-query-list/custom-query-list.component';
import { CustomQueryFormComponent } from 'app/pages/sofia/custom-query/custom-query-form/custom-query-form.component';
import { SecurityListComponent } from 'app/pages/sofia/security/security-list/security-list.component';
import {ListWrapperComponent} from '../../pages/sofia/list/list-wrapper/list-wrapper.component';
import {AuthGuard} from '../../guards/auth.guard';
import {NodeGraphComponent} from '../../pages/sofia/node-graph/asset/node-graph.component';
import {FormWrapperComponent} from '../../pages/sofia/form/form-wrapper/form-wrapper.component';
import {CompositeAssetNodeGraphComponent} from '../../pages/sofia/node-graph/composite-asset/composite-asset-node-graph/composite-asset-node-graph.component';
import {HtmlDashboardDesignerFormComponent} from '../../pages/sofia/html-dashboard-designer/html-dashboard-designer-form/html-dashboard-designer-form.component';
import {HtmlDashboardDesignerListComponent} from '../../pages/sofia/html-dashboard-designer/html-dashboard-designer-list/html-dashboard-designer-list.component';
import {ExpressionViewerComponent} from '../../pages/sofia/expression-viewer/expression-viewer.component';
import {RoleListComponent} from '../../pages/sofia/role/role-list/role-list.component';
import {RoleFormComponent} from '../../pages/sofia/role/role-form/role-form.component';
import {LanguageDesignerFormComponent} from '../../pages/sofia/language-designer/language-designer-form/language-designer-form.component';
import {LanguageDesignerListComponent} from '../../pages/sofia/language-designer/language-designer-list/language-designer-list.component';
import {ListDesignerTranslationFormComponent} from '../../pages/sofia/list-designer/list-designer-translation-form/list-designer-translation-form.component';
import {PivotListComponent} from '../../pages/sofia/pivot-list/pivot-list/pivot-list.component';
import {PivotListWrapperComponent} from '../../pages/sofia/pivot-list/pivot-list-wrapper/pivot-list-wrapper.component';
import {MenuDesignerTranslationFormComponent} from '../../pages/sofia/menu-designer/menu-designer-translation-form/menu-designer-translation-form.component';
import {DataTransferFormComponent} from '../../pages/sofia/data_transfer/data-transfer-form/data-transfer-form.component';
import {DataTransferListComponent} from '../../pages/sofia/data_transfer/data-transfer-list/data-transfer-list.component';
import {AuthorDashboardComponent} from '../../pages/sofia/author-dashboard/author-dashboard.component';
import {SettingsComponent} from '../../pages/sofia/settings/settings.component';
import {TimelineComponent} from '../../pages/sofia/timeline/timeline/timeline.component';
import {TimelineDesignerListComponent} from '../../pages/sofia/timeline-designer/timeline-designer-list/timeline-designer-list.component';
import {TimelineDesignerFormComponent} from '../../pages/sofia/timeline-designer/timeline-designer-form/timeline-designer-form.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'main/:id', component: NavigatorComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'table', component: TableComponent, canActivate: [AuthGuard]},
  {path: 'typography', component: TypographyComponent, canActivate: [AuthGuard]},
  {path: 'icons', component: IconsComponent, canActivate: [AuthGuard]},
  {path: 'maps', component: MapsComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard]},
  {path: 'table-designer-list', component: TableDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'table-designer-form', component: TableDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'menu-designer-list', component: MenuDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'menu-designer-form', component: MenuDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'menu-designer-translation-form', component: MenuDesignerTranslationFormComponent, canActivate: [AuthGuard]},
  {path: 'list-designer-list', component: ListDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'list-designer-form', component: ListDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'list-designer-translation-form', component: ListDesignerTranslationFormComponent, canActivate: [AuthGuard]},
  {path: 'component-designer-form', component: ComponentDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'component-designer-list', component: ComponentDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'view-designer-list', component: ViewDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'view-designer-form', component: ViewDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'appview-designer-list', component: AppViewDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'appview-designer-form', component: AppViewDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'list-alt', component: ListWrapperComponent, canActivate: [AuthGuard]},
  {path: 'pivotlist', component: PivotListComponent, canActivate: [AuthGuard]},
  {path: 'pivotlist-alt', component: PivotListWrapperComponent, canActivate: [AuthGuard]},
  {path: 'form-designer-list', component: FormDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'form-designer-form', component: FormDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
  {path: 'form-alt', component: FormWrapperComponent, canActivate: [AuthGuard]},
  {path: 'chart-designer-form', component: ChartDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'chart-designer-list', component: ChartDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'info-card-designer-form', component: InfoCardDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'info-card-designer-list', component: InfoCardDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-designer-form', component: DashboardDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-designer-list', component: DashboardDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'report-designer-list', component: ReportDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'report-designer-form', component: ReportDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'xls-import-designer-form', component: XlsImportDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'xls-import-designer-list', component: XlsImportDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'xls-import', component: XlsImportComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-alt', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'default', component: EmptyComponent, canActivate: [AuthGuard]},
  {path: 'search-designer-list', component: SearchDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'search-designer-form', component: SearchDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'cve-search', component: CveSearchComponent, canActivate: [AuthGuard]},
  {path: 'vendor-list', component: VendorListComponent, canActivate: [AuthGuard]},
  {path: 'vendor-product-list', component: VendorProductListComponent, canActivate: [AuthGuard]},
  {path: 'vendor-product-cpe-list', component: VendorProductCpeListComponent, canActivate: [AuthGuard]},
  {path: 'cve-search-settings', component: CveSearchSettingsComponent, canActivate: [AuthGuard]},
  {path: 'user-group-list', component: UserGroupListComponent, canActivate: [AuthGuard]},
  {path: 'user-group-form', component: UserGroupFormComponent, canActivate: [AuthGuard]},
  {path: 'custom-query-form', component: CustomQueryFormComponent, canActivate: [AuthGuard] },
  {path: 'custom-query-list', component: CustomQueryListComponent, canActivate: [AuthGuard]},
  {path: 'security-list', component: SecurityListComponent, canActivate: [AuthGuard]},
  {path: 'node-graph', component: NodeGraphComponent, canActivate: [AuthGuard]},
  {path: 'node-graph-alt', component: NodeGraphComponent, canActivate: [AuthGuard]},
  {path: 'composite-asset-node-graph', component: CompositeAssetNodeGraphComponent, canActivate: [AuthGuard]},
  {path: 'html-dashboard-designer-form', component: HtmlDashboardDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'html-dashboard-designer-list', component: HtmlDashboardDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'expression-viewer', component: ExpressionViewerComponent, canActivate: [AuthGuard]},
  {path: 'role-list', component: RoleListComponent, canActivate: [AuthGuard]},
  {path: 'role-form', component: RoleFormComponent, canActivate: [AuthGuard]},
  {path: 'language-designer-form', component: LanguageDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'language-designer-list', component: LanguageDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'data-transfer-form', component: DataTransferFormComponent, canActivate: [AuthGuard]},
  {path: 'data-transfer-list', component: DataTransferListComponent, canActivate: [AuthGuard]},
  {path: 'author-dashboard', component: AuthorDashboardComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'time-line', component: TimelineComponent, canActivate: [AuthGuard]},
  {path: 'timeline-designer-list', component: TimelineDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'timeline-designer-form', component: TimelineDesignerFormComponent, canActivate: [AuthGuard]},
];

CommandNavigatorService.NavPages = AdminLayoutRoutes;
