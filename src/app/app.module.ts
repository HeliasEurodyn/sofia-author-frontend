import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {SidebarModule} from './shared/sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {TableDesignerFormComponent} from './pages/table-designer/table-designer-form/table-designer-form.component';
import {TableDesignerListComponent} from './pages/table-designer/table-designer-list/table-designer-list.component';
import {FormsModule} from '@angular/forms';
import {MenuDesignerListComponent} from './pages/menu-designer/menu-designer-list/menu-designer-list.component';
import {MenuDesignerFormComponent} from './pages/menu-designer/menu-designer-form/menu-designer-form.component';
import {LoginComponent} from './pages/login/login.component';
import {ListDesignerFormComponent} from './pages/list-designer/list-designer-form/list-designer-form.component';
import {ListDesignerListComponent} from './pages/list-designer/list-designer-list/list-designer-list.component';
import {
  ComponentDesignerListComponent
} from './pages/component-designer/component-designer-list/component-designer-list.component';
import {
  ComponentDesignerFormComponent
} from './pages/component-designer/component-designer-form/component-designer-form.component';
import {ViewDesignerListComponent} from './pages/view-designer/view-designer-list/view-designer-list.component';
import {ViewDesignerFormComponent} from './pages/view-designer/view-designer-form/view-designer-form.component';
import {
  AppViewDesignerFormComponent
} from './pages/appview-designer/app-view-designer-form/app-view-designer-form.component';
import {
  AppViewDesignerListComponent
} from './pages/appview-designer/app-view-designer-list/app-view-designer-list.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SofiaDateDirective} from './directives/sofia-date.directive';
import {NgxMaskModule} from 'ngx-mask';
import {DatePipe} from '@angular/common';
import {UserFormComponent} from './pages/user/user-form/user-form.component';
import {UserListComponent} from './pages/user/user-list/user-list.component';
import {AuthenticationHeaderInterceptor} from './interceptors/authentication-header-interceptor';
import {HttpRequestLoadingInterceptor} from './interceptors/http-request-loading.interceptor';
import {HttpRequestErrorInterceptor} from './interceptors/http-request-error.interceptor';
import {FormDesignerFormComponent} from './pages/form-designer/form-designer-form/form-designer-form.component';
import {FormDesignerListComponent} from './pages/form-designer/form-designer-list/form-designer-list.component';
import {
  FormDesignerFormToolBoxComponent
} from './pages/form-designer/form-designer-form-tool-box/form-designer-form-tool-box.component';
import {ChartDesignerFormComponent} from './pages/chart-designer/chart-designer-form/chart-designer-form.component';
import {ChartDesignerListComponent} from './pages/chart-designer/chart-designer-list/chart-designer-list.component';
import {
  InfoCardDesignerFormComponent
} from './pages/info-card-designer/info-card-designer-form/info-card-designer-form.component';
import {
  InfoCardDesignerListComponent
} from './pages/info-card-designer/info-card-designer-list/info-card-designer-list.component';
import {
  DashboardDesignerFormComponent
} from './pages/dashboard-designer/dashboard-designer-form/dashboard-designer-form.component';
import {
  DashboardDesignerListComponent
} from './pages/dashboard-designer/dashboard-designer-list/dashboard-designer-list.component';
import {EmptyComponent} from './pages/empty/empty.component';
import {YesNoDialogComponent} from './shared/yes-no-dialog/yes-no-dialog.component';
import {
  FlowboardDesignerFormComponent
} from './pages/flowboard-designer/flowboard-designer-form/flowboard-designer-form.component';
import {
  FlowboardDesignerListComponent
} from './pages/flowboard-designer/flowboard-designer-list/flowboard-designer-list.component';
import {ReportDesignerListComponent} from './pages/report-designer/report-designer-list/report-designer-list.component';
import {ReportDesignerFormComponent} from './pages/report-designer/report-designer-form/report-designer-form.component';
import {OkDialogComponent} from './shared/ok-dialog/ok-dialog.component';
import {
  XlsImportDesignerFormComponent
} from './pages/xms-import-designer/xls-import-designer-form/xls-import-designer-form.component';
import {
  XlsImportDesignerListComponent
} from './pages/xms-import-designer/xls-import-designer-list/xls-import-designer-list.component';
import {SearchDesignerFormComponent} from './pages/search-designer/search-designer-form/search-designer-form.component';
import {SearchDesignerListComponent} from './pages/search-designer/search-designer-list/search-designer-list.component';
import {Title} from '@angular/platform-browser';
import {UserGroupListComponent} from './pages/usergroup/user-group-list/user-group-list.component';
import {UserGroupFormComponent} from './pages/usergroup/user-group-form/user-group-form.component';
import {CustomQueryFormComponent} from './pages/custom-query/custom-query-form/custom-query-form.component';
import {CustomQueryListComponent} from './pages/custom-query/custom-query-list/custom-query-list.component';
import {SecurityListComponent} from './pages/security/security-list/security-list.component';
import {SecurityFormComponent} from './pages/security/security-form/security-form.component';
import {CallBackComponent} from './pages/call-back/call-back.component';
import {
  HtmlDashboardDesignerFormComponent
} from './pages/html-dashboard-designer/html-dashboard-designer-form/html-dashboard-designer-form.component';
import {
  HtmlDashboardDesignerListComponent
} from './pages/html-dashboard-designer/html-dashboard-designer-list/html-dashboard-designer-list.component';
import {SafeHtmlPipe} from './services/system/safe-html.pipe';
import {ExpressionViewerComponent} from './pages/expression-viewer/expression-viewer.component';
import {RoleListComponent} from './pages/role/role-list/role-list.component';
import {RoleFormComponent} from './pages/role/role-form/role-form.component';
import {
  LanguageDesignerListComponent
} from './pages/language-designer/language-designer-list/language-designer-list.component';
import {
  LanguageDesignerFormComponent
} from './pages/language-designer/language-designer-form/language-designer-form.component';
import {
  ListDesignerTranslationFormComponent
} from './pages/list-designer/list-designer-translation-form/list-designer-translation-form.component';
import {AceModule} from 'ngx-ace-wrapper';
import {ChartsModule} from 'ng2-charts';
import {
  MenuDesignerTranslationFormComponent
} from './pages/menu-designer/menu-designer-translation-form/menu-designer-translation-form.component';
import {DataTransferListComponent} from './pages/data_transfer/data-transfer-list/data-transfer-list.component';
import {DataTransferFormComponent} from './pages/data_transfer/data-transfer-form/data-transfer-form.component';
import {AuthorDashboardComponent} from './pages/author-dashboard/author-dashboard.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {
  TimelineDesignerListComponent
} from './pages/timeline-designer/timeline-designer-list/timeline-designer-list.component';
import {
  TimelineDesignerFormComponent
} from './pages/timeline-designer/timeline-designer-form/timeline-designer-form.component';
import {
  SseNotificationTemplateListComponent
} from './pages/sse-notification-template/sse-notification-template-list/sse-notification-template-list.component';
import {
  SseNotificationTemplateFormComponent
} from './pages/sse-notification-template/sse-notification-template-form/sse-notification-template-form.component';

import {FormDesignerTranslationFormComponent} from './pages/form-designer/form-designer-translation-form/form-designer-translation-form.component';
import { CalendarDesginerListComponent } from './pages/calendar/calendar-desginer-list/calendar-desginer-list.component';
import { CalendarDesginerFormComponent } from './pages/calendar/calendar-desginer-form/calendar-desginer-form.component';
import { HtmlTemplateDesignerFormComponent } from './pages/html-template-designer/html-template-designer-form/html-template-designer-form.component';
import { HtmlTemplateDesignerListComponent } from './pages/html-template-designer/html-template-designer-list/html-template-designer-list.component';
import { AccessControlComponent } from './pages/access-control/access-control.component';
import { ShortByOrderPipe } from './pages/table-designer/table-designer-form/short-by-order.pipe';
import { RemoveElementModalComponent } from './modals/remove_element_modal/remove-element-modal/remove-element-modal.component';
import { TagDesignerListComponent } from './pages/tag-designer/tag-designer-list/tag-designer-list.component';
import { TagDesignerFormComponent } from './pages/tag-designer/tag-designer-form/tag-designer-form.component';
import {NavCommandCalculatorComponent} from "./pages/nav-command-calculator/nav-command-calculator.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TableDesignerFormComponent,
    TableDesignerListComponent,
    MenuDesignerListComponent,
    MenuDesignerFormComponent,
    LoginComponent,
    ListDesignerFormComponent,
    ListDesignerListComponent,
    ComponentDesignerListComponent,
    ComponentDesignerFormComponent,
    ViewDesignerListComponent,
    ViewDesignerFormComponent,
    AppViewDesignerFormComponent,
    AppViewDesignerListComponent,
    SofiaDateDirective,
    UserFormComponent,
    UserListComponent,
    FormDesignerFormComponent,
    FormDesignerTranslationFormComponent,
    FormDesignerListComponent,
    FormDesignerFormToolBoxComponent,
    ChartDesignerFormComponent,
    ChartDesignerListComponent,
    InfoCardDesignerFormComponent,
    InfoCardDesignerListComponent,
    DashboardDesignerFormComponent,
    DashboardDesignerListComponent,
    EmptyComponent,
    YesNoDialogComponent,
    FlowboardDesignerFormComponent,
    FlowboardDesignerListComponent,
    ReportDesignerListComponent,
    ReportDesignerFormComponent,
    OkDialogComponent,
    XlsImportDesignerFormComponent,
    XlsImportDesignerListComponent,
    SearchDesignerFormComponent,
    SearchDesignerListComponent,
    UserGroupListComponent,
    UserGroupFormComponent,
    CustomQueryFormComponent,
    CustomQueryListComponent,
    SecurityListComponent,
    SecurityFormComponent,
    CallBackComponent,
    HtmlDashboardDesignerFormComponent,
    HtmlDashboardDesignerListComponent,
    SafeHtmlPipe,
    ExpressionViewerComponent,
    NavCommandCalculatorComponent,
    RoleListComponent,
    RoleFormComponent,
    LanguageDesignerListComponent,
    LanguageDesignerFormComponent,
    ListDesignerTranslationFormComponent,
    MenuDesignerTranslationFormComponent,
    DataTransferListComponent,
    DataTransferFormComponent,
    AuthorDashboardComponent,
    SettingsComponent,
    TimelineDesignerListComponent,
    TimelineDesignerFormComponent,
    SseNotificationTemplateListComponent,
    SseNotificationTemplateFormComponent,
    TagDesignerFormComponent,
    TagDesignerListComponent,
    CalendarDesginerFormComponent,
    CalendarDesginerListComponent,
    HtmlTemplateDesignerListComponent,
    HtmlTemplateDesignerFormComponent,
    AccessControlComponent,
    ShortByOrderPipe,
    RemoveElementModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    NgxMaskModule.forRoot(),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgbModule,
    AceModule,
    ChartsModule
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestLoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestErrorInterceptor, multi: true},
    Title
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
