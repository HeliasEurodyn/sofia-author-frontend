import {Routes} from '@angular/router';

import {UserComponent} from '../../pages/user/user.component';
import {TableDesignerListComponent} from '../../pages/table-designer/table-designer-list/table-designer-list.component';
import {TableDesignerFormComponent} from '../../pages/table-designer/table-designer-form/table-designer-form.component';
import {MenuDesignerListComponent} from '../../pages/menu-designer/menu-designer-list/menu-designer-list.component';
import {MenuDesignerFormComponent} from '../../pages/menu-designer/menu-designer-form/menu-designer-form.component';
import {ListDesignerListComponent} from '../../pages/list-designer/list-designer-list/list-designer-list.component';
import {ListDesignerFormComponent} from '../../pages/list-designer/list-designer-form/list-designer-form.component';
import {
  ComponentDesignerFormComponent
} from '../../pages/component-designer/component-designer-form/component-designer-form.component';
import {
  ComponentDesignerListComponent
} from '../../pages/component-designer/component-designer-list/component-designer-list.component';
import {ViewDesignerListComponent} from '../../pages/view-designer/view-designer-list/view-designer-list.component';
import {ViewDesignerFormComponent} from '../../pages/view-designer/view-designer-form/view-designer-form.component';
import {CommandNavigatorService} from '../../services/system/command-navigator.service';
import {
  AppViewDesignerListComponent
} from '../../pages/appview-designer/app-view-designer-list/app-view-designer-list.component';
import {
  AppViewDesignerFormComponent
} from '../../pages/appview-designer/app-view-designer-form/app-view-designer-form.component';
import {UserFormComponent} from '../../pages/user/user-form/user-form.component';
import {UserListComponent} from '../../pages/user/user-list/user-list.component';
import {FormDesignerListComponent} from '../../pages/form-designer/form-designer-list/form-designer-list.component';
import {FormDesignerFormComponent} from '../../pages/form-designer/form-designer-form/form-designer-form.component';
import {ChartDesignerFormComponent} from '../../pages/chart-designer/chart-designer-form/chart-designer-form.component';
import {ChartDesignerListComponent} from '../../pages/chart-designer/chart-designer-list/chart-designer-list.component';
import {
  InfoCardDesignerFormComponent
} from '../../pages/info-card-designer/info-card-designer-form/info-card-designer-form.component';
import {
  InfoCardDesignerListComponent
} from '../../pages/info-card-designer/info-card-designer-list/info-card-designer-list.component';
import {
  DashboardDesignerFormComponent
} from '../../pages/dashboard-designer/dashboard-designer-form/dashboard-designer-form.component';
import {
  DashboardDesignerListComponent
} from '../../pages/dashboard-designer/dashboard-designer-list/dashboard-designer-list.component';
import {EmptyComponent} from '../../pages/empty/empty.component';
import {
  ReportDesignerFormComponent
} from '../../pages/report-designer/report-designer-form/report-designer-form.component';
import {
  ReportDesignerListComponent
} from '../../pages/report-designer/report-designer-list/report-designer-list.component';
import {
  XlsImportDesignerFormComponent
} from '../../pages/xms-import-designer/xls-import-designer-form/xls-import-designer-form.component';
import {
  XlsImportDesignerListComponent
} from '../../pages/xms-import-designer/xls-import-designer-list/xls-import-designer-list.component';
import {
  SearchDesignerListComponent
} from '../../pages/search-designer/search-designer-list/search-designer-list.component';
import {
  SearchDesignerFormComponent
} from '../../pages/search-designer/search-designer-form/search-designer-form.component';
import {UserGroupListComponent} from '../../pages/usergroup/user-group-list/user-group-list.component';
import {UserGroupFormComponent} from '../../pages/usergroup/user-group-form/user-group-form.component';
import {CustomQueryListComponent} from 'app/pages/custom-query/custom-query-list/custom-query-list.component';
import {CustomQueryFormComponent} from 'app/pages/custom-query/custom-query-form/custom-query-form.component';
import {SecurityListComponent} from 'app/pages/security/security-list/security-list.component';
import {AuthGuard} from '../../guards/auth.guard';
import {
  HtmlDashboardDesignerFormComponent
} from '../../pages/html-dashboard-designer/html-dashboard-designer-form/html-dashboard-designer-form.component';
import {
  HtmlDashboardDesignerListComponent
} from '../../pages/html-dashboard-designer/html-dashboard-designer-list/html-dashboard-designer-list.component';
import {ExpressionViewerComponent} from '../../pages/expression-viewer/expression-viewer.component';
import {RoleListComponent} from '../../pages/role/role-list/role-list.component';
import {RoleFormComponent} from '../../pages/role/role-form/role-form.component';
import {
  LanguageDesignerFormComponent
} from '../../pages/language-designer/language-designer-form/language-designer-form.component';
import {
  LanguageDesignerListComponent
} from '../../pages/language-designer/language-designer-list/language-designer-list.component';
import {
  ListDesignerTranslationFormComponent
} from '../../pages/list-designer/list-designer-translation-form/list-designer-translation-form.component';
import {
  MenuDesignerTranslationFormComponent
} from '../../pages/menu-designer/menu-designer-translation-form/menu-designer-translation-form.component';
import {DataTransferFormComponent} from '../../pages/data_transfer/data-transfer-form/data-transfer-form.component';
import {DataTransferListComponent} from '../../pages/data_transfer/data-transfer-list/data-transfer-list.component';
import {AuthorDashboardComponent} from '../../pages/author-dashboard/author-dashboard.component';
import {SettingsComponent} from '../../pages/settings/settings.component';
import {
  TimelineDesignerListComponent
} from '../../pages/timeline-designer/timeline-designer-list/timeline-designer-list.component';
import {
  TimelineDesignerFormComponent
} from '../../pages/timeline-designer/timeline-designer-form/timeline-designer-form.component';
import {
  SseNotificationTemplateListComponent
} from '../../pages/sse-notification-template/sse-notification-template-list/sse-notification-template-list.component';
import {
  SseNotificationTemplateFormComponent
} from '../../pages/sse-notification-template/sse-notification-template-form/sse-notification-template-form.component';
import {
  TagDesignerFormComponent
} from '../../pages/tag-designer/tag-designer-form/tag-designer-form.component';
import {
  TagDesignerListComponent
} from '../../pages/tag-designer/tag-designer-list/tag-designer-list.component';
import {FormDesignerTranslationFormComponent} from '../../pages/form-designer/form-designer-translation-form/form-designer-translation-form.component';
import { CalendarDesginerListComponent } from '../../pages/calendar/calendar-desginer-list/calendar-desginer-list.component';
import { CalendarDesginerFormComponent } from '../../pages/calendar/calendar-desginer-form/calendar-desginer-form.component';
import { HtmlTemplateDesignerFormComponent } from '../../pages/html-template-designer/html-template-designer-form/html-template-designer-form.component';
import { HtmlTemplateDesignerListComponent } from '../../pages/html-template-designer/html-template-designer-list/html-template-designer-list.component';
import {AccessControlComponent} from '../../pages/access-control/access-control.component';
import {NavCommandCalculatorPageComponent} from "../../pages/nav-command-calculator/nav-command-calculator-page.component";
import {RuleDesignerFormComponent} from "../../pages/rule-designer/rule-designer-form/rule-designer-form.component";
import {RuleDesignerListComponent} from "../../pages/rule-designer/rule-designer-list/rule-designer-list.component";
import {
  RuleOperatorDesignerListComponent
} from "../../pages/rule-operator-designer/rule-operator-designer-list/rule-operator-designer-list.component";
import {
  RuleOperatorDesignerFormComponent
} from "../../pages/rule-operator-designer/rule-operator-designer-form/rule-operator-designer-form.component";
import {
  RuleFieldDesignerListComponent
} from "../../pages/rule-field-designer/rule-field-designer-list/rule-field-designer-list.component";
import {
  RuleFieldDesignerFormComponent
} from "../../pages/rule-field-designer/rule-field-designer-form/rule-field-designer-form.component";

export const AdminLayoutRoutes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
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
  {path: 'form-designer-list', component: FormDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'form-designer-form', component: FormDesignerFormComponent, canActivate: [AuthGuard]},
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
  {path: 'default', component: EmptyComponent, canActivate: [AuthGuard]},
  {path: 'search-designer-list', component: SearchDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'search-designer-form', component: SearchDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'user-group-list', component: UserGroupListComponent, canActivate: [AuthGuard]},
  {path: 'user-group-form', component: UserGroupFormComponent, canActivate: [AuthGuard]},
  {path: 'custom-query-form', component: CustomQueryFormComponent, canActivate: [AuthGuard] },
  {path: 'custom-query-list', component: CustomQueryListComponent, canActivate: [AuthGuard]},
  {path: 'security-list', component: SecurityListComponent, canActivate: [AuthGuard]},
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
  {path: 'timeline-designer-list', component: TimelineDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'timeline-designer-form', component: TimelineDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'notification-template-list', component: SseNotificationTemplateListComponent, canActivate: [AuthGuard]},
  {path: 'notification-template-form', component: SseNotificationTemplateFormComponent, canActivate: [AuthGuard]},
  {path: 'tag-designer-form', component: TagDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'tag-designer-list', component: TagDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'form-designer-translation-form', component: FormDesignerTranslationFormComponent, canActivate: [AuthGuard]},
  {path: 'calendar-designer-list', component: CalendarDesginerListComponent, canActivate: [AuthGuard]},
  {path: 'calendar-designer-form', component: CalendarDesginerFormComponent, canActivate: [AuthGuard]},
  {path: 'html-template-designer-list', component: HtmlTemplateDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'html-template-designer-form', component: HtmlTemplateDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'form-designer-translation-form', component: FormDesignerTranslationFormComponent, canActivate: [AuthGuard]},
  {path: 'access-control', component: AccessControlComponent, canActivate: [AuthGuard]},
  {path: 'nav-command-calculator', component: NavCommandCalculatorPageComponent, canActivate: [AuthGuard]},
  {path: 'rule-designer-form', component: RuleDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'rule-designer-list', component: RuleDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'rule-field-designer-list', component: RuleFieldDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'rule-field-designer-form', component: RuleFieldDesignerFormComponent, canActivate: [AuthGuard]},
  {path: 'rule-operator-designer-list', component: RuleOperatorDesignerListComponent, canActivate: [AuthGuard]},
  {path: 'rule-operator-designer-form', component: RuleOperatorDesignerFormComponent, canActivate: [AuthGuard]}

];

CommandNavigatorService.NavPages = AdminLayoutRoutes;
