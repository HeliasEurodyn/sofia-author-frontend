import {Component, Input, OnInit} from '@angular/core';
import {InfoCardDTO} from '../../dtos/sofia/info-card/info-card-dto';
import {InfoCardService} from '../../services/crud/info-card.service';
import {CommandNavigatorService} from '../../services/system/sofia/command-navigator.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ListScriptsService} from '../../services/system/sofia/list-scripts.service';
import {InfoCartScriptService} from '../../services/system/sofia/info-cart-script.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  @Input() id: number;
  @Input() public extraParamsMap: Map<any, any>;

  public dto: InfoCardDTO = null;

  constructor(private service: InfoCardService,
              private sanitizer: DomSanitizer, private infoCartScriptService: InfoCartScriptService,
              private navigatorService: CommandNavigatorService) {
  }

  ngOnInit(): void {
      this.refresh();
  }

  refresh(): void {
    let extraParams = '';
    if ( this.extraParamsMap != null) {
      this.extraParamsMap.forEach((value, key) => {
        extraParams += '&' +  encodeURI(key) + '=' +  encodeURI(value);
      });
    }

    this.service.getByIdWithParams(this.id, extraParams).subscribe(data => {
      this.dto = data;
      this.infoCartScriptService.loadWithPromise(this).then(response => {});
    });
  }

  openPage() {
    this.navigatorService.navigate(this.dto.command);
  }

  trustResource(resource) {
    return this.sanitizer.bypassSecurityTrustHtml(resource);
  }

}
