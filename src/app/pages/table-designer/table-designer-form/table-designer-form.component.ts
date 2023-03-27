import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableDTO} from '../../../dtos/table/tableDTO';
import {TableService} from '../../../services/crud/table.service';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {TableFieldDTO} from '../../../dtos/table/table-field-dto';
import {Location} from '@angular/common'
import {NotificationService} from '../../../services/system/notification.service';
import {ForeignKeyConstrainDTO} from '../../../dtos/table/foreign-key-constrain-dto';
import {
  RemoveElementModalComponent
} from '../../../modals/remove_element_modal/remove-element-modal/remove-element-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RemoveForeignKeyConstrainDTO} from '../../../dtos/table/remove-foreign-key-constrain-dto';
import { TagDTO } from 'app/dtos/tag/tag-dto';
import { TagDesignerService } from 'app/services/crud/tag-designer.service';
import { PersistEntityDTO } from 'app/dtos/persistEntity/persist-entity-dto';

@Component({
  selector: 'app-table-designer-form',
  templateUrl: './table-designer-form.component.html',
  styleUrls: ['./table-designer-form.component.css']
})
export class TableDesignerFormComponent extends PageComponent implements OnInit {

  public referentialActions = ['CASCADE', 'SET NULL', 'RESTRICT', 'NO ACTION', 'SET DEFAULT']

  public dto: TableDTO;
  shortOrder = 0;
  public tableExists = false;
  public mode: string;
  public isCollapsed = false;
  public customTableNameMask = '0*';
  public customTableNamePattern = {'0': {pattern: new RegExp('\[a-z0-9_\]')}};
  public visibleSection = 'fields';
  public fkConstrainShortOrder = 1;

  public listOfTables: Array<TableDTO>;
  public removeForeignKeyConstrainDTO: RemoveForeignKeyConstrainDTO;
  public tagsList: Array<TagDTO>;

  constructor(private activatedRoute: ActivatedRoute,
              private service: TableService,
              private router: Router,
              private location: Location,
              private notificationService: NotificationService,
              private navigatorService: CommandNavigatorService,
              private modalService: NgbModal,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    let id = '0';
    this.initNav(this.activatedRoute);
    this.setTitle('Table Designer Entry');

    this.mode = 'new-record';
    this.dto = new TableDTO();
    this.removeForeignKeyConstrainDTO = new RemoveForeignKeyConstrainDTO();

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
        if (this.dto?.foreignKeyConstrainList == null) {
          this.dto.foreignKeyConstrainList = [];
        }
      });
    } else {
      this.dto.tableFieldList = [];
      this.addField()

      this.dto.foreignKeyConstrainList = [];
     // this.addForeignKeyConstrain();
    }

    this.getTables();
  }

  getTables() {
    this.service.get().subscribe(data => {
      this.listOfTables = data;
    });

    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
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

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
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

  removeForeignKeyConstrainLine(row: ForeignKeyConstrainDTO) {
    const modalReference = this.modalService.open(RemoveElementModalComponent);
    modalReference.componentInstance.element = row;

    modalReference.result.then((foreignKeyConstrainForDelete) => {
      if (foreignKeyConstrainForDelete) {
        if (foreignKeyConstrainForDelete?.id == null) {
          this.dto.foreignKeyConstrainList = this.dto.foreignKeyConstrainList.filter(item => item !== row);
        } else {
          this.removeForeignKeyConstrainDTO.setTableDTO(this.dto);
          this.removeForeignKeyConstrainDTO.setForeignKeyConstrainDTO(foreignKeyConstrainForDelete);
          this.service.dropForeignKeyConstrain(this.removeForeignKeyConstrainDTO).subscribe(data => {
            this.dto.foreignKeyConstrainList = this.dto.foreignKeyConstrainList.filter(item => item !== row);
          });
        }
      }
    });
  }

  save() {

    if (this.dto.name === '' || this.dto.name == null) {
      this.notificationService.showNotification('top', 'center', 'alert-danger',
        'fa-exclamation-circle', '<b>Table Name</b> Table Name cannot be empty!');
      return;
    }

    for (const field of this.dto.tableFieldList) {
      if (field.name === '') {
        this.notificationService.showNotification('top', 'center', 'alert-danger',
          'fa-exclamation-circle', '<b>Empty Field Name</b> Field Name cannot be empty!');
        return;
      }
    }

    if (this?.dto?.foreignKeyConstrainList.some(this.isNonValid)) {
      this.notificationService.showNotification('top', 'center', 'alert-danger',
        'fa-exclamation-circle', '<b>A non-valid foreign key constrain has been added</b><br> Please check the list with foreign keys!');
      return;
    }

    const set = new Set();

    if (this?.dto?.foreignKeyConstrainList.some((fk) => set.size === (set.add(fk.name), set.size))) {
      this.notificationService.showNotification('top', 'center', 'alert-danger',
        'fa-exclamation-circle', '<b>Duplicate Foreign Key Constrain Name Has Been Added</b>');
      return;
    }

    let shortOrder = 1;
    this.dto.tableFieldList.forEach(field => {
      field.shortOrder = shortOrder;
      shortOrder++;
    });

    let fkConstrainShortOrder = 1;
    this.dto.foreignKeyConstrainList.forEach(fk => {
      fk.shortOrder = fkConstrainShortOrder;
      fkConstrainShortOrder++;
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

    if (this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
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

    if (this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
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

    if (this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)].name === '') {
      tableFieldDTO = this.dto.tableFieldList[(this.dto.tableFieldList.length - 1)];
    } else {
      tableFieldDTO = this.addField();
    }

    tableFieldDTO.name = 'short_order';
    tableFieldDTO.type = 'bigint';
    tableFieldDTO.size = '20';
  }


  addField() {

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
    this.shortOrder++;
    return tableFieldDTO;
  }

  generateTableFields() {
    this.service.generateTableFields(this.dto.name).subscribe(data => {
      if (data.length > 0) {
        this.dto.tableFieldList = data;
      }
    });

  }

  addForeignKeyConstrain() {

    const foreignKeyConstrain = new ForeignKeyConstrainDTO();
    foreignKeyConstrain.shortOrder = this.fkConstrainShortOrder;
    foreignKeyConstrain.id = null;
    foreignKeyConstrain.name = '';
    foreignKeyConstrain.fieldName = '';
    foreignKeyConstrain.referredTable = new TableDTO();
    foreignKeyConstrain.referredField = new TableFieldDTO();
    foreignKeyConstrain.onDelete = this.referentialActions[4];
    foreignKeyConstrain.onUpdate = this.referentialActions[4];
    this.dto.foreignKeyConstrainList.push(foreignKeyConstrain);
    console.log(this.dto)
    this.fkConstrainShortOrder++;
  }

  onChange(referredTable: TableDTO, selectedForeignKeyConstrain: ForeignKeyConstrainDTO) {
    const referredTableId = referredTable?.id;
    selectedForeignKeyConstrain.referredTable.tableFieldList = null;
    this.service.getById(referredTableId).subscribe(data => {
      selectedForeignKeyConstrain.referredTable.tableFieldList = data?.tableFieldList;
    });
  }



  isNonValid(foreignKeyConstrain: ForeignKeyConstrainDTO) {

    return foreignKeyConstrain.name === ''
      || foreignKeyConstrain.fieldName === ''
      || foreignKeyConstrain.referredTable.id == null
      || foreignKeyConstrain.referredField.id == null;
  }
  compareReferredField(referredField1: TableFieldDTO, referredField2: TableFieldDTO): boolean {
    return referredField1 && referredField2 ? referredField1.id === referredField2.id : referredField1 === referredField2;
  }

  compareReferredTable(referredTable1: TableDTO, referredTable2: TableDTO): boolean {
    return referredTable1 && referredTable2 ? referredTable1.id === referredTable2.id : referredTable1 === referredTable2;
  }

  selectTag(selectedTag: TagDTO) {
    const tag: TagDTO = new TagDTO(selectedTag.title, selectedTag.color);
    if(this.dto.tags == null){
      this.dto.tags = [];
    }

    this.dto.tags.push(tag);
  }

  deleteTagChipsLine(tag: TagDTO) {
    this.dto.tags =
      this.dto.tags.filter(item => item !== tag);
  }


}
