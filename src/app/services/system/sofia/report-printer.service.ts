import {Injectable} from '@angular/core';
import {ReportDesignerService} from '../../crud/sofia/report-designer.service';
import {ReportService} from '../../crud/sofia/report.service';

@Injectable({
  providedIn: 'root'
})
export class ReportPrinterService {

  constructor(private reportService: ReportService) {
  }

  print(id: any, reportParametersMap: Map<any, any>) {
    this.reportService.print(id, reportParametersMap).subscribe(reportData => {
      this.reportService.getReportType(id).subscribe(typeResponce => {
        this.saveFile(reportData.body, typeResponce['type']);
      });
    });
  }

  saveFile(reportData: any, reportType: string) {
    const blob = new Blob([reportData], {type: 'application/' + reportType});
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
}
