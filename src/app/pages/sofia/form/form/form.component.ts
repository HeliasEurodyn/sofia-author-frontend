import {Component, OnInit, ViewChild} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {FormService} from '../../../../services/crud/sofia/form.service';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {FormDto} from '../../../../dtos/sofia/form/form-dto';
import {FormTabDto} from '../../../../dtos/sofia/form/form-tab-dto';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {ComponentPersistEntityDTO} from '../../../../dtos/sofia/component/component-persist-entity-dto';
import {YesNoDialogComponent} from '../../../../shared/yes-no-dialog/yes-no-dialog.component';
import {FormControlButtonDTO} from '../../../../dtos/sofia/form/form-control-button-dto';
import {OkDialogComponent} from '../../../../shared/ok-dialog/ok-dialog.component';
import {PreviousRouteService} from '../../../../services/system/sofia/previous-route.service';
import {Title} from '@angular/platform-browser';
import {FormScriptsService} from '../../../../services/system/sofia/form-scripts.service';
import {FormActionButton} from '../../../../dtos/sofia/form/form-action-button';
import {DynamicCssScriptLoaderService} from '../../../../services/system/sofia/dynamic-css-script-loader.service';
import {concatMap} from 'rxjs/operators';
import {FormAssignmentsService} from './services/form-assignments.service';
import {FormTableLinesService} from './services/form-table-lines.service';
import {TableComponentService} from '../../../../services/crud/sofia/table-component.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends PageComponent implements OnInit {

  public dto: FormDto;
  public selectedFormTabId: number;
  public selectedFormPopupCode: string;
  public test = '';
  @ViewChild('yesNoDialog') yesNoDialog: YesNoDialogComponent;
  @ViewChild('okDialog') okDialog: OkDialogComponent;
  public selectedActionButton: FormActionButton
  selectionId = '';

  constructor(private activatedRoute: ActivatedRoute,
              private service: FormService,
              private location: Location,
              private previousRouteService: PreviousRouteService,
              private navigatorService: CommandNavigatorService,
              private dynamicCssScriptLoader: DynamicCssScriptLoaderService,
              public  datepipe: DatePipe,
              private title: Title,
              private formScriptsService: FormScriptsService,
              private formAssignmentsService: FormAssignmentsService,
              private formTableLinesService: FormTableLinesService,
              private tableComponentService: TableComponentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
    let id = '0';
    this.selectionId = '';
    this.dto = new FormDto();
    let clone = false;
    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
    }

    if (locateParams.has('SELECTION-ID')) {
      this.selectionId = locateParams.get('SELECTION-ID');
    }

    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        clone = true;
      }
    }

    this.loadDynamicCssScript(id).then(data => {
      if (!clone) {
        this.retrieveAndAssignData(id, this.selectionId);
      } else {
        this.retrieveCloneAndAssignData(id, this.selectionId);
      }
    });
  }

  loadDynamicCssScript(id: any): Promise<any> {
    return this.dynamicCssScriptLoader.addScript(Number(id), 'form');
  }

  retrieveAndAssignData(id: string, selectionId: string) {
    this.service.getUiVersion(id)
      .pipe(concatMap(instanceVersion => this.service.getUi(id, instanceVersion))
      ).subscribe(dto => {
      localStorage.setItem('cachedForm' + id, JSON.stringify(dto));
      this.service.getData(id, selectionId).subscribe(componentDTO => {
        dto.component = componentDTO;
        this.dto = dto;
        this.setSelectedComponentPersistEntityFieldsToTables(this.dto.component.componentPersistEntityList);

        this.dto.component.componentPersistEntityList =
          this.formAssignmentsService.addAssignmentsToTableDataLines(this.dto.component.componentPersistEntityList);

        this.dto = this.formAssignmentsService.assignComponentFieldsToFormFields(this.dto);
        this.dto = this.formTableLinesService.generateFormTableLines(this.dto);
        this.setDefaultSelectedTab();
        this.formScriptsService.load(this);
        this.defineTitle();
      });
    });
  }

  retrieveCloneAndAssignData(id: string, selectionId: string) {
    this.service.getUiVersion(id)
      .pipe(concatMap(instanceVersion => this.service.getUi(id, instanceVersion))
      ).subscribe(dto => {
      localStorage.setItem('cachedForm' + id, JSON.stringify(dto));
      this.service.getCloneData(id, selectionId).subscribe(componentDTO => {
        dto.component = componentDTO;
        this.dto = dto;
        this.setSelectedComponentPersistEntityFieldsToTables(this.dto.component.componentPersistEntityList);

        this.dto.component.componentPersistEntityList =
          this.formAssignmentsService.addAssignmentsToTableDataLines(this.dto.component.componentPersistEntityList);

        this.dto = this.formAssignmentsService.assignComponentFieldsToFormFields(this.dto);
        this.dto = this.formTableLinesService.generateFormTableLines(this.dto);
        this.setDefaultSelectedTab();
        this.formScriptsService.load(this);
        this.defineTitle();
      });
    });
  }

  defineTitle() {
    if (this.commandShowCustomTitle()) {
      let windowTitle = this.getWindowCustomTitleFromCommand();
      windowTitle = this.setWindowTitleFieldValues(windowTitle, this.dto.component.componentPersistEntityList);
      this.title.setTitle(windowTitle);
    }
  }

  setWindowTitleFieldValues(windowTitle: string, componentPersistEntityList: ComponentPersistEntityDTO[]) {
    for (const cpe of componentPersistEntityList) {
      for (const cpef of cpe.componentPersistEntityFieldList) {
        windowTitle = windowTitle.replace('#' + cpe.code + '.' + cpef.code + '#', cpef.value);
      }
      if (cpe.componentPersistEntityList != null) {
        this.setWindowTitleFieldValues(windowTitle, cpe.componentPersistEntityList);
      }
    }
    return windowTitle;
  }

  saveAndBack() {
    const componentValues = this.mapComponentTreeForSaving(this.dto.component.componentPersistEntityList);
    if (this.selectionId === '') {
      this.service.saveData(this.dto.id, componentValues).subscribe(data => {
        this.location.back();
      });
    } else {
      this.service.updateData(this.dto.id, componentValues).subscribe(data => {
        this.location.back();
      });
    }

  }

  save(callback) {
    const componentValues = this.mapComponentTreeForSaving(this.dto.component.componentPersistEntityList);
    if (this.selectionId === '') {
      this.service.saveData(this.dto.id, componentValues).subscribe(data => {
        callback(data);
      });
    } else {
      this.service.updateData(this.dto.id, componentValues).subscribe(data => {
        callback(data);
      });
    }
  }

  mapComponentTreeForSaving(cpeList: ComponentPersistEntityDTO[]) {
    const componentPersistEntitiesMap = new Map();
    for (const cpe of cpeList) {
      let cpeMap: Map<any, any>;
      if (cpe.multiDataLine === true) {
        cpeMap = this.mapMultilineComponentPersistEntityForSaving(cpe);
      } else {
        cpeMap = this.mapComponentPersistEntityForSaving(cpe) // , componentPersistEntitiesMap);
      }
      componentPersistEntitiesMap.set(cpe.code, cpeMap);
    }

    return componentPersistEntitiesMap;
  }

  mapComponentPersistEntityForSaving(componentPersistEntity: ComponentPersistEntityDTO) {
    const componentPersistEntityMap = new Map();

    /* Itterate fields and assign to Component Persist Entity map */
    for (const cpef of componentPersistEntity.componentPersistEntityFieldList) {

      /* If field not Assigned, assign it to map */
      if (!componentPersistEntityMap.has(cpef.code)) {

        let value = null;
        if (cpef.assignment.type === 'datetime') {
          value = this.datepipe.transform(cpef.value,
            'yyyyMMddHHmmss',
            'UTC');
        } else {
          value = cpef.value
        }

        componentPersistEntityMap.set(cpef.code,
          value);
      }
    }

    if (componentPersistEntity.componentPersistEntityList != null) {
      const componentPersistSubEntitiesMap = this.mapComponentTreeForSaving(componentPersistEntity.componentPersistEntityList);
      componentPersistEntityMap.set('sub-entities', componentPersistSubEntitiesMap);
    }

    /* Return new Component Persist Entity Map  */
    return componentPersistEntityMap;
  }

  mapMultilineComponentPersistEntityForSaving(componentPersistEntity: ComponentPersistEntityDTO) {

    const componentPersistEntityMap = new Map();
    let index = 0;
    for (const componentPersistEntityDataLine of componentPersistEntity.componentPersistEntityDataLines) {
      const componentPersistEntityLineMap = new Map();
      for (const cpef of componentPersistEntityDataLine.componentPersistEntityFieldList) {
        if (!componentPersistEntityLineMap.has(cpef.code)) {
          let value = null;
          if (cpef.assignment.type === 'datetime') {
            value = this.datepipe.transform(cpef.value,
              'yyyyMMddHHmmss',
              'UTC');
          } else {
            value = cpef.value
          }

          componentPersistEntityLineMap.set(cpef.code,
            value);
        }
      }

      if (componentPersistEntityDataLine.componentPersistEntityList != null) {
        const componentPersistSubEntitiesMap = this.mapComponentTreeForSaving(componentPersistEntityDataLine.componentPersistEntityList);
        componentPersistEntityLineMap.set('sub-entities', componentPersistSubEntitiesMap);
      }

      componentPersistEntityMap.set(index, componentPersistEntityLineMap);
      index++;
    }

    componentPersistEntityMap.set('multiline-entity', 'true');
    return componentPersistEntityMap;
  }

  delete() {
    this.service.deleteData(this.dto.id, this.selectionId).subscribe(data => {
      this.location.back();
    });
  }

  setSelectedComponentPersistEntityFieldsToTables(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    for (const componentPersistEntity of componentPersistEntityList) {
      if (componentPersistEntity.multiDataLine) {
        if (componentPersistEntity.componentPersistEntityDataLines.length > 0) {
          componentPersistEntity.componentPersistEntityList =
            componentPersistEntity.componentPersistEntityDataLines[0].componentPersistEntityList;
          componentPersistEntity.componentPersistEntityFieldList =
            componentPersistEntity.componentPersistEntityDataLines[0].componentPersistEntityFieldList;
        }
      }

      if (componentPersistEntity.componentPersistEntityList != null) {
        this.setSelectedComponentPersistEntityFieldsToTables(componentPersistEntity.componentPersistEntityList);
      }
    }
  }

  setDefaultSelectedTab() {
    this.selectedFormTabId = 0;

    if (this.dto.formTabs.length > 0) {
      this.selectedFormTabId = this.dto.formTabs[0].id;
    } else {
      return;
    }
  }

  selectFormTab(formTab: FormTabDto) {
    this.formScriptsService.buttonClickOccured(this.dto.id, formTab.code);
    this.selectedFormTabId = formTab.id;
  }

  navigateToNextPage() {
  }

  setSelectedTableLineComponentTree(componentPersistEntity: ComponentPersistEntityDTO,
                                    formControlLineComponentPersistEntity: ComponentPersistEntityDTO) {

    componentPersistEntity.componentPersistEntityFieldList
      .forEach(cpef => {
        formControlLineComponentPersistEntity.componentPersistEntityFieldList
          .filter(lineCpef => lineCpef.id === cpef.id)
          .forEach(lineCpef => cpef.value = lineCpef.value);
      });

    componentPersistEntity.componentPersistEntityList
      .forEach(cpe => {
        formControlLineComponentPersistEntity.componentPersistEntityList
          .filter(lineCpe => lineCpe.id === cpe.id)
          .forEach(lineCpe => this.setSelectedTableLineComponentTree(cpe, lineCpe));
      });

  }

  formButtonClicked(formControlButton: FormControlButtonDTO) {

    this.formScriptsService.buttonClickOccured(this.dto.id, formControlButton.code);

    const command = formControlButton.editor;
    if (command == null) {
      return;
    }

    if (command === '') {
      return;
    }

    this.navigatorService.navigate(command);
  }

  headerActionButtonClicked(actionButton: FormActionButton) {
    this.formScriptsService.buttonClickOccured(this.dto.id, actionButton.code);

    if (actionButton.editor == null || actionButton.editor === '') {
      return;
    }

    if (actionButton.editor === '#saveAndBack#') {
      this.saveAndBack();
      return;
    }

    if (actionButton.editor === '#delete#') {
      this.delete();
      return;
    }

    this.navigatorService.navigate(actionButton.editor);

  }

  setSelectedActionButton(actionButton: FormActionButton) {
    this.selectedActionButton = actionButton;
  }

  fieldEventOccured(event: any) {
    this.formScriptsService.fieldEventOccured(this.dto.id,
      event.entityCode,
      event.fieldCode,
      event.eventtype,
      event.event);
  }
}
