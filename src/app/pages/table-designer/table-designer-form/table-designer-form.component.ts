import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableDTO} from '../../../dtos/sofia/table/tableDTO';
import {TableService} from '../../../services/crud/table.service';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {TableFieldDTO} from '../../../dtos/sofia/table/table-field-dto';
import { Location } from '@angular/common'
import {NotificationService} from '../../../services/system/sofia/notification.service';

@Component({
  selector: 'app-table-designer-form',
  templateUrl: './table-designer-form.component.html',
  styleUrls: ['./table-designer-form.component.css']
})
export class TableDesignerFormComponent extends PageComponent implements OnInit {

  public dto: TableDTO;
  shortOrder = 0;
  public tableExists = false;
  public mode: string;
  public isCollapsed = false;
  public customTableNameMask = '0*';
  public customTableNamePattern = { '0': { pattern: new RegExp('\[a-z0-9_\]')} };

  constructor(private activatedRoute: ActivatedRoute,
              private service: TableService,
              private router: Router,
              private location: Location,
              private notificationService: NotificationService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    let id = '0';
    this.initNav(this.activatedRoute);
    this.setTitle('Table Designer Entry');

    this.mode = 'new-record';
    this.dto = new TableDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.setTitle('Entry ' + this.dto.name);
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.dto = new TableDTO();
    this.dto.tableFieldList = [];
    const tableFieldDTO = new TableFieldDTO();
    tableFieldDTO.shortOrder = this.shortOrder;
    tableFieldDTO.name = '';
    tableFieldDTO.description = '';
    tableFieldDTO.type = '';
    tableFieldDTO.size = '';
    tableFieldDTO.createdOn = null;
    tableFieldDTO.createdBy = null;
    tableFieldDTO.autoIncrement = false;
    tableFieldDTO.primaryKey = false;
    tableFieldDTO.version = null;
    tableFieldDTO.hasDefault = false;
    tableFieldDTO.defaultValue = '';
    tableFieldDTO.isUnsigned = false;
    tableFieldDTO.hasNotNull = false;
    this.dto.tableFieldList.push(tableFieldDTO);
  }

  checkIfTableAlreadyExists() {
    this.service.tableExists(this.dto.name).subscribe(data => {
      if (data) {
        this.tableExists = true;
      } else {
        this.tableExists = false;
      }
    });
  }

  showPreviousPageButton() {
      return true;
  }

  navigateToPreviousPage() {
    this.location.back();
   // this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        for (const tableField of this.dto.tableFieldList) {
          tableField.id = null;
          tableField.version = null;
        }
        this.mode = 'new-record';
      }
    }
  }

  removeLine(row) {
    if (this.dto.tableFieldList.length === 1) {
      return;
    }
    this.dto.tableFieldList = this.dto.tableFieldList.filter(item => item !== row);
  }

  save() {

    if ( this.dto.name === '' || this.dto.name == null) {
      this.notificationService.showNotification('top', 'center', 'alert-danger',
        'fa-exclamation-circle', '<b>Table Name</b> Table Name cannot be empty!');
      return;
    }

    for (const field of this.dto.tableFieldList) {
      if ( field.name === '') {
        this.notificationService.showNotification('top', 'center', 'alert-danger',
          'fa-exclamation-circle', '<b>Empty Field Name</b> Field Name cannot be empty!');
        return;
      }
    }

    let shortOrder = 1;
    this.dto.tableFieldList.forEach(field => {
      field.shortOrder = shortOrder;
      shortOrder ++;
    });

    if (this.mode === 'edit-record') {
      this.service.update(this.dto).subscribe(data => {
        this.location.back();
      });
    } else {
      this.service.save(this.dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  toList() {
    this.router.navigate(['/listDto-designer-list']);
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.router.navigate(['/listDto-designer-list']);
    });
  }

  addDefaultFields() {
    let tableFieldDTO = null;

    if ( this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
      tableFieldDTO = this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)];
    } else {
      tableFieldDTO = this.addField();
    }

    tableFieldDTO.name = 'id';
    tableFieldDTO.type = 'bigint';
    tableFieldDTO.size = '20';
    tableFieldDTO.autoIncrement = true;
    tableFieldDTO.primaryKey = true;
    tableFieldDTO.hasNotNull = true;

    tableFieldDTO = this.addField();
    tableFieldDTO.name = 'created_by';
    tableFieldDTO.type = 'varchar';
    tableFieldDTO.size = '36';

    tableFieldDTO = this.addField();
    tableFieldDTO.name = 'created_on';
    tableFieldDTO.type = 'datetime';

    tableFieldDTO = this.addField();
    tableFieldDTO.name = 'modified_by';
    tableFieldDTO.type = 'varchar';
    tableFieldDTO.size = '36';

    tableFieldDTO = this.addField();
    tableFieldDTO.name = 'modified_on';
    tableFieldDTO.type = 'datetime';

  }

  addVersionField() {
    let tableFieldDTO = null;

    if ( this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
      tableFieldDTO = this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)];
    } else {
      tableFieldDTO = this.addField();
    }

    tableFieldDTO.name = 'version';
    tableFieldDTO.type = 'bigint';
    tableFieldDTO.size = '20';
  }

  addShortOrderField() {
    let tableFieldDTO = null;

    if ( this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
      tableFieldDTO = this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)];
    } else {
      tableFieldDTO = this.addField();
    }

    tableFieldDTO.name = 'short_order';
    tableFieldDTO.type = 'bigint';
    tableFieldDTO.size = '20';
  }


  addField() {
    this.shortOrder++;

    const tableFieldDTO = new TableFieldDTO();
    tableFieldDTO.id = null;
    tableFieldDTO.shortOrder = this.shortOrder;
    tableFieldDTO.name = '';
    tableFieldDTO.description = '';
    tableFieldDTO.type = '';
    tableFieldDTO.size = '';
    tableFieldDTO.createdOn = null;
    tableFieldDTO.createdBy = null;
    tableFieldDTO.autoIncrement = false;
    tableFieldDTO.primaryKey = false;
    tableFieldDTO.version = null;
    tableFieldDTO.hasDefault = false;
    tableFieldDTO.defaultValue = '';
    tableFieldDTO.isUnsigned = false;
    tableFieldDTO.hasNotNull = false;

    this.dto.tableFieldList.push(tableFieldDTO);

    return tableFieldDTO;
  }

  generateTableFields() {
    this.service.generateTableFields(this.dto.name).subscribe(data => {
      if ( data.length > 0) {
        this.dto.tableFieldList = data;
      }
    });

  }
}
