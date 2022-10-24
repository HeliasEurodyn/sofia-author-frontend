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
import {ComponentDesignerListComponent} from './pages/component-designer/component-designer-list/component-designer-list.component';
import {ComponentDesignerFormComponent} from './pages/component-designer/component-designer-form/component-designer-form.component';
import {ViewDesignerListComponent} from './pages/view-designer/view-designer-list/view-designer-list.component';
import {ViewDesignerFormComponent} from './pages/view-designer/view-designer-form/view-designer-form.component';
import {ListComponent} from './pages/list/list/list.component';
import {AppViewDesignerFormComponent} from './pages/appview-designer/app-view-designer-form/app-view-designer-form.component';
import {AppViewDesignerListComponent} from './pages/appview-designer/app-view-designer-list/app-view-designer-list.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePickerComponent} from './form-controlls/date-picker/date-picker.component';
import {NgbDateFRParserFormatter} from './form-controlls/date-picker/ngb-date-frparser-formatter';
import {NgbUTCStringAdapter} from './form-controlls/date-picker/ngb-utcstring-adapter';
import {SofiaDateDirective} from './directives/sofia-date.directive';
import {NgxMaskModule} from 'ngx-mask';
import {DatePipe} from '@angular/common';
import {UserFormComponent} from './pages/user/user-form/user-form.component';
import {UserListComponent} from './pages/user/user-list/user-list.component';
import {AuthenticationHeaderInterceptor} from './interceptors/authentication-header-interceptor';
import {HttpRequestLoadingInterceptor} from './interceptors/http-request-loading.interceptor';
import {HttpRequestErrorInterceptor} from './interceptors/http-request-error.interceptor';
import {ListSelectorComponent} from './form-controlls/list-selector/list-selector.component';
import {FormDesignerFormComponent} from './pages/form-designer/form-designer-form/form-designer-form.component';
import {FormDesignerListComponent} from './pages/form-designer/form-designer-list/form-designer-list.component';
import {FormDesignerFormToolBoxComponent} from './pages/form-designer/form-designer-form-tool-box/form-designer-form-tool-box.component';
import {FormComponent} from './pages/form/form/form.component';
import {NumericInputComponent} from './form-controlls/numeric-input/numeric-input.component';
import {VarcharInputComponent} from './form-controlls/varchar-input/varchar-input.component';
import {TextInputComponent} from './form-controlls/text-input/text-input.component';
import {FormTableComponent} from './pages/form/form/form-table/form-table.component';
import {ChartDesignerFormComponent} from './pages/chart-designer/chart-designer-form/chart-designer-form.component';
import {ChartDesignerListComponent} from './pages/chart-designer/chart-designer-list/chart-designer-list.component';
import {InfoCardDesignerFormComponent} from './pages/info-card-designer/info-card-designer-form/info-card-designer-form.component';
import {InfoCardDesignerListComponent} from './pages/info-card-designer/info-card-designer-list/info-card-designer-list.component';
import {DashboardComponent} from './pages/dashboard/dashboard/dashboard.component';
import {DashboardDesignerFormComponent} from './pages/dashboard-designer/dashboard-designer-form/dashboard-designer-form.component';
import {DashboardDesignerListComponent} from './pages/dashboard-designer/dashboard-designer-list/dashboard-designer-list.component';
import {ChartComponent} from './pages/chart/chart.component';
import {InfoCardComponent} from './pages/info-card/info-card.component';
import {EmptyComponent} from './pages/empty/empty.component';
import {YesNoDialogComponent} from './shared/yes-no-dialog/yes-no-dialog.component';
import {FlowboardDesignerFormComponent} from './pages/flowboard-designer/flowboard-designer-form/flowboard-designer-form.component';
import {FlowboardDesignerListComponent} from './pages/flowboard-designer/flowboard-designer-list/flowboard-designer-list.component';
import {ReportDesignerListComponent} from './pages/report-designer/report-designer-list/report-designer-list.component';
import {ReportDesignerFormComponent} from './pages/report-designer/report-designer-form/report-designer-form.component';
import {OkDialogComponent} from './shared/ok-dialog/ok-dialog.component';
import {XlsImportDesignerFormComponent} from './pages/xms-import-designer/xls-import-designer-form/xls-import-designer-form.component';
import {XlsImportDesignerListComponent} from './pages/xms-import-designer/xls-import-designer-list/xls-import-designer-list.component';
import {XlsImportComponent} from './pages/xls-import/xls-import.component';
import { SearchDesignerFormComponent } from './pages/search-designer/search-designer-form/search-designer-form.component';
import { SearchDesignerListComponent } from './pages/search-designer/search-designer-list/search-designer-list.component';
import {Title} from '@angular/platform-browser';
import { ComboBoxComponent } from './form-controlls/combo-box/combo-box.component';
import { SearchComponent } from './pages/search/search/search.component';

import { UserGroupListComponent } from './pages/usergroup/user-group-list/user-group-list.component';
import { UserGroupFormComponent } from './pages/usergroup/user-group-form/user-group-form.component';

import { CustomQueryFormComponent } from './pages/custom-query/custom-query-form/custom-query-form.component';
import { CustomQueryListComponent } from './pages/custom-query/custom-query-list/custom-query-list.component';
import { SecurityListComponent } from './pages/security/security-list/security-list.component';
import { SecurityFormComponent } from './pages/security/security-form/security-form.component';

import { ListWrapperComponent } from './pages/list/list-wrapper/list-wrapper.component';
import { AutocompleteComboBoxComponent } from './form-controlls/autocomplete-combo-box/autocomplete-combo-box.component';
import { CheckBoxComponent } from './form-controlls/check-box/check-box.component';
import { CallBackComponent } from './pages/call-back/call-back.component';
import { FormWrapperComponent } from './pages/form/form-wrapper/form-wrapper.component';
import { HtmlDashboardDesignerFormComponent } from './pages/html-dashboard-designer/html-dashboard-designer-form/html-dashboard-designer-form.component';
import { HtmlDashboardDesignerListComponent } from './pages/html-dashboard-designer/html-dashboard-designer-list/html-dashboard-designer-list.component';
import { HtmlDashboardComponent } from './pages/html-dashboard/html-dashboard/html-dashboard.component';
import { SafeHtmlPipe } from './services/system/safe-html.pipe';
import { ExpressionViewerComponent } from './pages/expression-viewer/expression-viewer.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleFormComponent } from './pages/role/role-form/role-form.component';
import { LanguageDesignerListComponent } from './pages/language-designer/language-designer-list/language-designer-list.component';
import { LanguageDesignerFormComponent } from './pages/language-designer/language-designer-form/language-designer-form.component';
import { ListDesignerTranslationFormComponent } from './pages/list-designer/list-designer-translation-form/list-designer-translation-form.component';
import {AceModule} from 'ngx-ace-wrapper';
import { ChipsComponent } from './form-controlls/chips/chips.component';
import { PivotListComponent } from './pages/pivot-list/pivot-list/pivot-list.component';
import { PivotListWrapperComponent } from './pages/pivot-list/pivot-list-wrapper/pivot-list-wrapper.component';
import { DashboardWrapperComponent } from './pages/dashboard/dashboard-wrapper/dashboard-wrapper.component';
import {ChartsModule} from 'ng2-charts';
import { MenuDesignerTranslationFormComponent } from './pages/menu-designer/menu-designer-translation-form/menu-designer-translation-form.component';
import { DataTransferListComponent } from './pages/data_transfer/data-transfer-list/data-transfer-list.component';
import { DataTransferFormComponent } from './pages/data_transfer/data-transfer-form/data-transfer-form.component';
import { AuthorDashboardComponent } from './pages/author-dashboard/author-dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PasswordInputComponent } from './form-controlls/password-input/password-input.component';
import { FileSelectorComponent } from './form-controlls/file-selector/file-selector.component';
import { TimelineComponent } from './pages/timeline/timeline/timeline.component';
import { TimelineDesignerListComponent } from './pages/timeline-designer/timeline-designer-list/timeline-designer-list.component';
import { TimelineDesignerFormComponent } from './pages/timeline-designer/timeline-designer-form/timeline-designer-form.component';
import { SseNotificationTemplateListComponent } from './pages/sse-notification-template/sse-notification-template-list/sse-notification-template-list.component';
import { SseNotificationTemplateFormComponent } from './pages/sse-notification-template/sse-notification-template-form/sse-notification-template-form.component';
import { BusinessUnitDesignerFormComponent } from './pages/business-unit-designer/business-unit-designer-form/business-unit-designer-form.component';
import { BusinessUnitDesignerListComponent } from './pages/business-unit-designer/business-unit-designer-list/business-unit-designer-list.component';
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
    ListComponent,
    AppViewDesignerFormComponent,
    AppViewDesignerListComponent,
    DatePickerComponent,
    SofiaDateDirective,
    UserFormComponent,
    UserListComponent,
    ListSelectorComponent,
    FormDesignerFormComponent,
    FormDesignerListComponent,
    FormDesignerFormToolBoxComponent,
    FormComponent,
    NumericInputComponent,
    VarcharInputComponent,
    TextInputComponent,
    FormTableComponent,
    ChartDesignerFormComponent,
    ChartDesignerListComponent,
    InfoCardDesignerFormComponent,
    InfoCardDesignerListComponent,
    DashboardComponent,
    DashboardDesignerFormComponent,
    DashboardDesignerListComponent,
    ChartComponent,
    InfoCardComponent,
    EmptyComponent,
    YesNoDialogComponent,
    FlowboardDesignerFormComponent,
    FlowboardDesignerListComponent,
    ReportDesignerListComponent,
    ReportDesignerFormComponent,
    OkDialogComponent,
    XlsImportDesignerFormComponent,
    XlsImportDesignerListComponent,
    XlsImportComponent,
    SearchDesignerFormComponent,
    SearchDesignerListComponent,
    ComboBoxComponent,
    SearchComponent,
    UserGroupListComponent,
    UserGroupFormComponent,
    CustomQueryFormComponent,
    CustomQueryListComponent,
    SecurityListComponent,
    SecurityFormComponent,
    ListWrapperComponent,
    AutocompleteComboBoxComponent,
    CheckBoxComponent,
    CallBackComponent,
    FormWrapperComponent,
    HtmlDashboardDesignerFormComponent,
    HtmlDashboardDesignerListComponent,
    HtmlDashboardComponent,
    SafeHtmlPipe,
    ExpressionViewerComponent,
    RoleListComponent,
    RoleFormComponent,
    LanguageDesignerListComponent,
    LanguageDesignerFormComponent,
    ListDesignerTranslationFormComponent,
    ChipsComponent,
    PivotListComponent,
    PivotListWrapperComponent,
    DashboardWrapperComponent,
    MenuDesignerTranslationFormComponent,
    DataTransferListComponent,
    DataTransferFormComponent,
    AuthorDashboardComponent,
    SettingsComponent,
    PasswordInputComponent,
    FileSelectorComponent,
    TimelineComponent,
    TimelineDesignerListComponent,
    TimelineDesignerFormComponent,
    SseNotificationTemplateListComponent,
    SseNotificationTemplateFormComponent,
    BusinessUnitDesignerFormComponent,
    BusinessUnitDesignerListComponent
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
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateFRParserFormatter
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbUTCStringAdapter
    },
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
