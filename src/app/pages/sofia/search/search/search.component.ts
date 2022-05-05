import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../../../services/crud/sofia/search.service';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends PageComponent implements OnInit {
  public dto: any;
  searchValue = '';
  id = '0';

  constructor(private activatedRoute: ActivatedRoute,
              private navigatorService: CommandNavigatorService,
              private service: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      this.id = locateParams.get('ID');
    }
    if (this.params.has('VALUE')) {
      const searchValueBase64 = this.params.get('VALUE');
      this.searchValue = atob(searchValueBase64);
    }

    this.service.search(this.id, this.searchValue).subscribe(data => {
      this.dto = data;
    });
    this.focusElement();
  }

  public focusElement() {

    const focusClass = 'search-field-box';

    const elements = document.getElementsByClassName(focusClass);
    if (elements.length === 1) {
      const htmlELement = elements[0] as HTMLElement;
      htmlELement.focus();
      return true;
    }
    return false;
  }


  onEnterMethod() {
    this.service.search(this.id, this.searchValue).subscribe(data => {
      this.dto = data;
    });
  }

  setStyle(iconColor: string) {
    return 'font-size: 20px;color:' + iconColor + ';';
  }

  nav(command: string) {
    this.selectEmmiter.emit(null);
    this.navigatorService.navigate(command);
  }
}
