import {Component, OnInit} from '@angular/core';
import {ReportDTO} from '../../../dtos/report/report-dto';
import {ReportParameterDTO} from '../../../dtos/report/report-parameter-dto';
import {ActivatedRoute} from '@angular/router';
import {PageComponent} from '../../page/page-component';
import {ReportDesignerService} from '../../../services/crud/report-designer.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/system/notification.service';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import {ReportService} from '../../../services/crud/report.service';
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';

@Component({
  selector: 'app-report-designer-form',
  templateUrl: './report-designer-form.component.html',
  styleUrls: ['./report-designer-form.component.css']
})
export class ReportDesignerFormComponent extends PageComponent implements OnInit {

  public reports: any;

  public dto: ReportDTO = new ReportDTO();
  public mode: string;
  fileToUpload: File = null;
  fileRequiredWarning = '';
  public visibleSection = 'general';
  private selectedSecurityRow: AccessControlDto;
  public roles: any;
  public tagsList: Array<TagDTO>;

  constructor(private reportDesignerService: ReportDesignerService,
              private reportService: ReportService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private roleService: RoleService,
              private notificationService: NotificationService,
              private tagDesignerService: TagDesignerService) {
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
      this.reportDesignerService.getById(id).subscribe(dto => {
        this.dto = dto;
      });
    }
    this.refreshData();
    this.refreshTags();
  }

  refreshData() {
    this.reportDesignerService.get().subscribe(data => {
      this.reports = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });
  }

  refreshTags(){
    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  removeReportParameter(reportParameter: ReportParameterDTO) {
    if (this.dto !== undefined) {
      this.dto.reportParameterList =
        this.dto.reportParameterList.filter(item => item !== reportParameter);
    }
  }

  removeSubreport(reportDTO: ReportDTO) {
    if (this.dto !== undefined) {
      this.dto.subreports =
        this.dto.subreports.filter(item => item !== reportDTO);
    }
  }

  addNewReportParameter() {
    const reportParameter = new ReportParameterDTO();
    this.dto.reportParameterList.push(reportParameter);
  }

  saveAndClose() {
    if (this.dto.reportFilename == null || this.dto.reportFilename === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-file-code',
        '<b>JrXml File is required</b>');
      this.fileRequiredWarning = 'File is required';
      return;
    }

    if (this.fileToUpload != null) {
      this.reportDesignerService.saveMultipartFormData(this.dto, this.fileToUpload).subscribe(dto => {
        this.location.back();
        this.dto = dto;
      });
    } else {
      this.reportDesignerService.save(this.dto).subscribe(dto => {
        this.location.back();
        this.dto = dto;
      });
    }
  }

  save() {
    if (this.dto.reportFilename == null || this.dto.reportFilename === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-file-code',
        '<b>JrXml File is required</b>');
      this.fileRequiredWarning = 'File is required';
      return;
    }
    if (this.fileToUpload != null) {
      this.reportDesignerService.saveMultipartFormData(this.dto, this.fileToUpload).subscribe(dto => {
        this.dto = dto;
        this.mode = 'edit-record';
      });
    } else {
      this.reportDesignerService.save(this.dto).subscribe(dto => {
        this.dto = dto;
        this.mode = 'edit-record';
      });
    }
  }

  delete() {
    this.reportDesignerService.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    this.dto.reportFilename = this.fileToUpload.name;
    this.fileRequiredWarning = '';
  }

  clearFile() {
    this.fileToUpload = null;
    this.dto.reportFilename = '';
  }

  print() {
    let emptyValue = false;
    this.dto.reportParameterList.forEach(reportParameter => {
      if (reportParameter.value == null || reportParameter.value === '') {
        emptyValue = true;
      }
    });

    if (emptyValue) {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-file-code',
        '<b>Emtpy Parameter Value</b>');
      return;
    }


    const reportParametersMap = new Map();
    this.dto.reportParameterList.forEach(reportParameter => {
      reportParametersMap.set(reportParameter.code, reportParameter.value);
    });

    this.reportService.print(this.dto.id, reportParametersMap).subscribe(response => {
      this.saveFile(response.body, this.dto.reportType);
    });
  }

  saveFile(downloadedData: any, reportType: string) {
    const blob = new Blob([downloadedData], {type: 'application/' + reportType});
    const url = window.URL.createObjectURL(blob);
    const downloadedReportFile = document.createElement('a');
    document.body.appendChild(downloadedReportFile);
    downloadedReportFile.setAttribute('style', 'display: none');
    downloadedReportFile.href = url;
    downloadedReportFile.download = 'report.' + reportType;
    downloadedReportFile.click();
    window.URL.revokeObjectURL(url);
    downloadedReportFile.remove();
  }

  selectReport(report: any) {
    if (this.dto.subreports == null) {
      this.dto.subreports = [];
    }
    this.dto.subreports.push(report);
  }

  downloadFile() {
    if (this.dto.id == null) {
      return;
    }

    if (this.dto.reportFilename == null) {
      return;
    }

    this.reportDesignerService.downloadFile(this.dto.id).subscribe(response => {
      const url = window.URL.createObjectURL(response.body);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = this.dto.reportFilename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

    });
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
    dto.type = 'report';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  selectRole(role) {
    this.selectedSecurityRow.role = role;
  }

  selectTag(selectedTag: TagDTO) {
    if(this.dto.tags == null){
      this.dto.tags = [];
    }
    this.dto.tags.push(selectedTag);
  }

  deleteTagChipsLine(tag: TagDTO) {
    this.dto.tags =
      this.dto.tags.filter(item => item !== tag);
  }

}
