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
import {TableDesignerFormComponent} from './pages/sofia/table-designer/table-designer-form/table-designer-form.component';
import {TableDesignerListComponent} from './pages/sofia/table-designer/table-designer-list/table-designer-list.component';
import {FormsModule} from '@angular/forms';
import {MenuDesignerListComponent} from './pages/sofia/menu-designer/menu-designer-list/menu-designer-list.component';
import {MenuDesignerFormComponent} from './pages/sofia/menu-designer/menu-designer-form/menu-designer-form.component';
import {LoginComponent} from './pages/sofia/login/login.component';
import {ListDesignerFormComponent} from './pages/sofia/list-designer/list-designer-form/list-designer-form.component';
import {ListDesignerListComponent} from './pages/sofia/list-designer/list-designer-list/list-designer-list.component';
import {ComponentDesignerListComponent} from './pages/sofia/component-designer/component-designer-list/component-designer-list.component';
import {ComponentDesignerFormComponent} from './pages/sofia/component-designer/component-designer-form/component-designer-form.component';
import {ViewDesignerListComponent} from './pages/sofia/view-designer/view-designer-list/view-designer-list.component';
import {ViewDesignerFormComponent} from './pages/sofia/view-designer/view-designer-form/view-designer-form.component';
import {ListComponent} from './pages/sofia/list/list/list.component';
import {NavigatorComponent} from './pages/demos/navigator/navigator.component';
import {AppViewDesignerFormComponent} from './pages/sofia/appview-designer/app-view-designer-form/app-view-designer-form.component';
import {AppViewDesignerListComponent} from './pages/sofia/appview-designer/app-view-designer-list/app-view-designer-list.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePickerComponent} from './form-controlls/sofia/date-picker/date-picker.component';
import {NgbDateFRParserFormatter} from './form-controlls/sofia/date-picker/ngb-date-frparser-formatter';
import {NgbUTCStringAdapter} from './form-controlls/sofia/date-picker/ngb-utcstring-adapter';
import {SofiaDateDirective} from './directives/sofia-date.directive';
import {NgxMaskModule} from 'ngx-mask';
import {DatePipe} from '@angular/common';
import {UserFormComponent} from './pages/sofia/user/user-form/user-form.component';
import {UserListComponent} from './pages/sofia/user/user-list/user-list.component';
import {AuthenticationHeaderInterceptor} from './interceptors/authentication-header-interceptor';
import {HttpRequestLoadingInterceptor} from './interceptors/http-request-loading.interceptor';
import {HttpRequestErrorInterceptor} from './interceptors/http-request-error.interceptor';
import {ListSelectorComponent} from './form-controlls/sofia/list-selector/list-selector.component';
import {FormDesignerFormComponent} from './pages/sofia/form-designer/form-designer-form/form-designer-form.component';
import {FormDesignerListComponent} from './pages/sofia/form-designer/form-designer-list/form-designer-list.component';
import {FormDesignerFormToolBoxComponent} from './pages/sofia/form-designer/form-designer-form-tool-box/form-designer-form-tool-box.component';
import {FormComponent} from './pages/sofia/form/form/form.component';
import {NumericInputComponent} from './form-controlls/sofia/numeric-input/numeric-input.component';
import {VarcharInputComponent} from './form-controlls/sofia/varchar-input/varchar-input.component';
import {TextInputComponent} from './form-controlls/sofia/text-input/text-input.component';
import {FormTableComponent} from './pages/sofia/form/form/form-table/form-table.component';
import {ChartDesignerFormComponent} from './pages/sofia/chart-designer/chart-designer-form/chart-designer-form.component';
import {ChartDesignerListComponent} from './pages/sofia/chart-designer/chart-designer-list/chart-designer-list.component';
import {InfoCardDesignerFormComponent} from './pages/sofia/info-card-designer/info-card-designer-form/info-card-designer-form.component';
import {InfoCardDesignerListComponent} from './pages/sofia/info-card-designer/info-card-designer-list/info-card-designer-list.component';
import {DashboardComponent} from './pages/sofia/dashboard/dashboard/dashboard.component';
import {DashboardDesignerFormComponent} from './pages/sofia/dashboard-designer/dashboard-designer-form/dashboard-designer-form.component';
import {DashboardDesignerListComponent} from './pages/sofia/dashboard-designer/dashboard-designer-list/dashboard-designer-list.component';
import {ChartComponent} from './pages/sofia/chart/chart.component';
import {InfoCardComponent} from './pages/sofia/info-card/info-card.component';
import {EmptyComponent} from './pages/sofia/empty/empty.component';
import {YesNoDialogComponent} from './shared/yes-no-dialog/yes-no-dialog.component';
import {FlowboardDesignerFormComponent} from './pages/sofia/flowboard-designer/flowboard-designer-form/flowboard-designer-form.component';
import {FlowboardDesignerListComponent} from './pages/sofia/flowboard-designer/flowboard-designer-list/flowboard-designer-list.component';
import {ReportDesignerListComponent} from './pages/sofia/report-designer/report-designer-list/report-designer-list.component';
import {ReportDesignerFormComponent} from './pages/sofia/report-designer/report-designer-form/report-designer-form.component';
import {OkDialogComponent} from './shared/ok-dialog/ok-dialog.component';
import {XlsImportDesignerFormComponent} from './pages/sofia/xms-import-designer/xls-import-designer-form/xls-import-designer-form.component';
import {XlsImportDesignerListComponent} from './pages/sofia/xms-import-designer/xls-import-designer-list/xls-import-designer-list.component';
import {XlsImportComponent} from './pages/sofia/xls-import/xls-import.component';
import { SearchDesignerFormComponent } from './pages/sofia/search-designer/search-designer-form/search-designer-form.component';
import { SearchDesignerListComponent } from './pages/sofia/search-designer/search-designer-list/search-designer-list.component';
import {Title} from '@angular/platform-browser';
import { ComboBoxComponent } from './form-controlls/sofia/combo-box/combo-box.component';
import { SearchComponent } from './pages/sofia/search/search/search.component';
import { CveSearchComponent } from './pages/cityscape/cve-search/cve-search.component';
import { VendorListComponent } from './pages/cityscape/vendor-list/vendor-list.component';
import { CveSearchSelectorComponent } from './form-controlls/cityscape/cve-search-selector/cve-search-selector.component';
import { VendorProductListComponent } from './pages/cityscape/vendor-product-list/vendor-product-list.component';
import { VendorProductCpeListComponent } from './pages/cityscape/vendor-product-cpe-list/vendor-product-cpe-list.component';
import { CveSearchSettingsComponent } from './pages/cityscape/cve-search-settings/cve-search-settings.component';
import { UserGroupListComponent } from './pages/sofia/usergroup/user-group-list/user-group-list.component';
import { UserGroupFormComponent } from './pages/sofia/usergroup/user-group-form/user-group-form.component';

import { CustomQueryFormComponent } from './pages/sofia/custom-query/custom-query-form/custom-query-form.component';
import { CustomQueryListComponent } from './pages/sofia/custom-query/custom-query-list/custom-query-list.component';
import { SecurityListComponent } from './pages/sofia/security/security-list/security-list.component';
import { SecurityFormComponent } from './pages/sofia/security/security-form/security-form.component';

import { ListWrapperComponent } from './pages/sofia/list/list-wrapper/list-wrapper.component';
import { AutocompleteComboBoxComponent } from './form-controlls/sofia/autocomplete-combo-box/autocomplete-combo-box.component';
import { CheckBoxComponent } from './form-controlls/sofia/check-box/check-box.component';
import { NodeGraphComponent } from './pages/sofia/node-graph/asset/node-graph.component';
import { NodeGraphWrapperComponent } from './pages/sofia/node-graph/asset/node-graph-wrapper/node-graph-wrapper.component';
import { CallBackComponent } from './pages/sofia/call-back/call-back.component';
import { FormWrapperComponent } from './pages/sofia/form/form-wrapper/form-wrapper.component';
import { CompositeAssetNodeGraphComponent } from './pages/sofia/node-graph/composite-asset/composite-asset-node-graph/composite-asset-node-graph.component';
import { HtmlDashboardDesignerFormComponent } from './pages/sofia/html-dashboard-designer/html-dashboard-designer-form/html-dashboard-designer-form.component';
import { HtmlDashboardDesignerListComponent } from './pages/sofia/html-dashboard-designer/html-dashboard-designer-list/html-dashboard-designer-list.component';
import { HtmlDashboardComponent } from './pages/sofia/html-dashboard/html-dashboard/html-dashboard.component';
import { SafeHtmlPipe } from './services/system/sofia/safe-html.pipe';
import { ExpressionViewerComponent } from './pages/sofia/expression-viewer/expression-viewer.component';
import { RoleListComponent } from './pages/sofia/role/role-list/role-list.component';
import { RoleFormComponent } from './pages/sofia/role/role-form/role-form.component';
import { LanguageDesignerListComponent } from './pages/sofia/language-designer/language-designer-list/language-designer-list.component';
import { LanguageDesignerFormComponent } from './pages/sofia/language-designer/language-designer-form/language-designer-form.component';
import { ListDesignerTranslationFormComponent } from './pages/sofia/list-designer/list-designer-translation-form/list-designer-translation-form.component';
import {AceModule} from 'ngx-ace-wrapper';
import { ChipsComponent } from './form-controlls/sofia/chips/chips.component';
import { PivotListComponent } from './pages/sofia/pivot-list/pivot-list/pivot-list.component';
import { PivotListWrapperComponent } from './pages/sofia/pivot-list/pivot-list-wrapper/pivot-list-wrapper.component';
import { DashboardWrapperComponent } from './pages/sofia/dashboard/dashboard-wrapper/dashboard-wrapper.component';
import {ChartsModule} from 'ng2-charts';
import { MenuDesignerTranslationFormComponent } from './pages/sofia/menu-designer/menu-designer-translation-form/menu-designer-translation-form.component';
import { DataTransferListComponent } from './pages/sofia/data_transfer/data-transfer-list/data-transfer-list.component';
import { DataTransferFormComponent } from './pages/sofia/data_transfer/data-transfer-form/data-transfer-form.component';
import { AuthorDashboardComponent } from './pages/sofia/author-dashboard/author-dashboard.component';
import { SettingsComponent } from './pages/sofia/settings/settings.component';
import { PasswordInputComponent } from './form-controlls/sofia/password-input/password-input.component';
import { FileSelectorComponent } from './form-controlls/sofia/file-selector/file-selector.component';
import { TimelineComponent } from './pages/sofia/timeline/timeline/timeline.component';
import { TimelineDesignerListComponent } from './pages/sofia/timeline-designer/timeline-designer-list/timeline-designer-list.component';
import { TimelineDesignerFormComponent } from './pages/sofia/timeline-designer/timeline-designer-form/timeline-designer-form.component';
import { SseNotificationTemplateListComponent } from './pages/sofia/sse-notification-template/sse-notification-template-list/sse-notification-template-list.component';
import { SseNotificationTemplateFormComponent } from './pages/sofia/sse-notification-template/sse-notification-template-form/sse-notification-template-form.component';
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
    NavigatorComponent,
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
    CveSearchComponent,
    VendorListComponent,
    CveSearchSelectorComponent,
    VendorProductListComponent,
    VendorProductCpeListComponent,
    CveSearchSettingsComponent,
    UserGroupListComponent,
    UserGroupFormComponent,
    CustomQueryFormComponent,
    CustomQueryListComponent,
    SecurityListComponent,
    SecurityFormComponent,
    ListWrapperComponent,
    AutocompleteComboBoxComponent,
    CheckBoxComponent,
    NodeGraphComponent,
    NodeGraphWrapperComponent,
    CallBackComponent,
    FormWrapperComponent,
    CompositeAssetNodeGraphComponent,
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
    SseNotificationTemplateFormComponent
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
