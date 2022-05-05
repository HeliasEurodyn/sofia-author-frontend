import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  // Types: alert-info, alert-success, alert-warning, alert-danger, alert-primary
  showNotification(from: String, align: String, type: String, icon: String, message: String) {
    this.toastr.info(
      '<i class="fa ' + icon + '"></i><span data-navigateToCommand="message"> ' + message + '</span>',
      '',
      {
        timeOut: 40000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-with-icon ' + type,
        positionClass: 'toast-' + from + '-' + align
      }
    );
  }
}
