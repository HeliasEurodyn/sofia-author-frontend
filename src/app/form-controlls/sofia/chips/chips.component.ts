import {Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/sofia/component/component-persist-entity-field-dto';
import {ComponentDTO} from '../../../dtos/sofia/component/componentDTO';
import {ComponentPersistEntityDTO} from '../../../dtos/sofia/component/component-persist-entity-dto';
import {CommandParserService} from '../../../services/system/sofia/command-parser.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {TableComponentService} from '../../../services/crud/sofia/table-component.service';
import * as uuid from 'uuid';
import {ComponentPersistEntityDataLineDTO} from '../../../dtos/sofia/component/component-persist-entity-data-line-dto';
import {AccessControlDto} from '../../../dtos/sofia/security/access-control-dto';
import {FormScriptsService} from '../../../services/system/sofia/form-scripts.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  @Input() command: string;
  // @Input() listRow: string[];
  // @Input() defaultValue: string;
  // @Input() value: string;
  // @Output() valueChange = new EventEmitter<string>();
  // private displayValue = '';
  @Output() keyDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() fieldClass: any;
  private uuid = '';
  displayFieldNames: string[] = [];

  // componentPersistEntityFieldList: ComponentPersistEntityFieldDTO[] = [];
  // @Input() component: ComponentDTO;
  // @Input() lineComponentPersistEntity: ComponentPersistEntityDTO = null;


  @Input() editable: Boolean;
  @Input() componentPersistEntity: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  selectedComponentPersistEntity: ComponentPersistEntityDTO;
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();
  refreshComponentCode = '';
  displayValues: any[] = [];

  @ViewChild('selectorField') selectorField: ElementRef;

  public chipValuesArray: string[] = [];

  constructor(
    private commandParserService: CommandParserService,
    private commandNavigatorService: CommandNavigatorService,
    private componentService: TableComponentService,
    private formScriptService: FormScriptsService
  ) {
  }

  ngOnInit(): void {
    this.uuid = uuid.v4();

    const commandParts: Map<string, string> = this.commandParserService.parse(this.command);
    this.displayFieldNames = this.commandParserService.parseListPart(commandParts, 'DISPLAY');
    const componentPersistEntityList: ComponentPersistEntityDTO[] =
      this.getListFromTree(this.componentPersistEntity.componentPersistEntityList);

    this.componentPersistEntity.componentPersistEntityFieldList.forEach(cpefl => {
      if (cpefl.id === this.componentPersistEntityFieldDTO.id) {
        this.selectedComponentPersistEntity = this.componentPersistEntity;
      }
    });

    componentPersistEntityList.forEach(componentPersistEntity => {
      componentPersistEntity.componentPersistEntityFieldList.forEach(cpefl => {
        if (cpefl.id === this.componentPersistEntityFieldDTO.id) {
          this.selectedComponentPersistEntity = componentPersistEntity;
        }
      });
    });

    if (commandParts.has('REFRESH')) {
      this.refreshComponentCode = commandParts.get('REFRESH');
    }

    this.generateDisplayValuesForComponent();
  }

  generateDisplayValuesForComponent() {
    this.displayValues = [];
    console.log(this.selectedComponentPersistEntity);
    this.selectedComponentPersistEntity.componentPersistEntityDataLines.forEach(dataline => {
      const display = this.generateDisplayValueForDataline(this.selectedComponentPersistEntity.code, dataline);
      this.displayValues.push({'dataline': dataline, 'display': display});
    });
  }

  generateDisplayValueForDataline(code: String, dataline: ComponentPersistEntityDataLineDTO) {
    const displayValueArray: string[] = [];

    const componentPersistEntityList: ComponentPersistEntityDTO[] =
       this.getListFromTree(dataline.componentPersistEntityList);

    this.displayFieldNames.forEach(displayFieldName => {

      dataline.componentPersistEntityFieldList
        .forEach(cpef => {
          const currentfield = code + '.' + cpef.code;
          if (displayFieldName === currentfield) {
            displayValueArray.push(cpef.value);
          }
        });

    componentPersistEntityList.forEach(componentPersistEntity => {
      componentPersistEntity.componentPersistEntityFieldList
        .forEach(cpef => {
          const currentfield = componentPersistEntity.code + '.' + cpef.code;
          if (displayFieldName === currentfield) {
            displayValueArray.push(cpef.value);
          }
        });
    });
    });

    return displayValueArray.join(' ');
  }

  /*
 * This function returns the componentPersistEntity list for this List Selector
 * */
  private getListFromTree(cpeList: ComponentPersistEntityDTO[]): ComponentPersistEntityDTO[] {
    if (cpeList == null) {
      return null;
    }

    const newCpeList: ComponentPersistEntityDTO[] = [];

    cpeList
      .forEach(cpe => {
        const childCpeList = this.getListFromTree(cpe.componentPersistEntityList);
        childCpeList.forEach(x => newCpeList.push(x));
      });

    newCpeList.forEach(x => cpeList.push(x));
    return cpeList;
  }

  deleteDataline(displayValue: any) {
   this.displayValues =
     this.displayValues.filter(item => item !== displayValue);

    this.selectedComponentPersistEntity.componentPersistEntityDataLines =
      this.selectedComponentPersistEntity.componentPersistEntityDataLines.filter(item => item !== displayValue.dataline);
  }

  openList() {
    const componentRefOnNavigation: ComponentRef<any> = this.commandNavigatorService.navigate(this.command);
    componentRefOnNavigation.instance.setPresetCommand(this.command);
    componentRefOnNavigation.instance.selectEmmiter.subscribe((returningValues: string[]) => {
      const value = returningValues['RETURN'];
      if (value != null) {
       const newDataline: ComponentPersistEntityDataLineDTO =
         this.formScriptService.newComponentPersistEntityDataLine(this.selectedComponentPersistEntity);

        newDataline.componentPersistEntityFieldList.forEach(cpefl => {
          if (cpefl.id === this.componentPersistEntityFieldDTO.id) {
            cpefl.value = value;
          }
        });

        this.refreshComponent(newDataline, value);
        this.generateDisplayValuesForComponent();
      }
      this.eventOccuredActions('listselected', null);
    });
  }

  refreshComponent(dataline: ComponentPersistEntityDataLineDTO, value): void {

    if (this.refreshComponentCode === '') {
      return;
    }

    let refreshCpe = null;
    dataline.componentPersistEntityList.forEach(componentPersistEntity => {
      if (componentPersistEntity.code === this.refreshComponentCode) {
        refreshCpe = componentPersistEntity;
      }
    });

    this.componentService.getComponentPersistEntityDataById(refreshCpe.id.toString(), value)
      .subscribe(newComponentPersistEntity => {
        this.updatePersistEntityValues(refreshCpe, newComponentPersistEntity);
        this.generateDisplayValuesForComponent();
      });
  }

  updatePersistEntityValues(oldCpe: ComponentPersistEntityDTO, newCpe: ComponentPersistEntityDTO) {

    oldCpe
      .componentPersistEntityFieldList
      .forEach(cpef => {
        const selectedCpef =
          newCpe.componentPersistEntityFieldList
            .find(newCpef => newCpef.id === cpef.id);
        if (selectedCpef != null) {
          cpef.value = selectedCpef.value;
        }
      });

    if (oldCpe.multiDataLine === true) {
      oldCpe.componentPersistEntityFieldList = newCpe.componentPersistEntityFieldList;
    }

    if (oldCpe.componentPersistEntityList == null || newCpe.componentPersistEntityList == null) {
      return;
    }

    oldCpe.componentPersistEntityList.forEach(cpe => {
      const selectedChildCpe =
        newCpe.componentPersistEntityList
          .find(newChildCpe => newChildCpe.id === cpe.id);
      if (selectedChildCpe != null) {
        this.updatePersistEntityValues(cpe, selectedChildCpe);
      }
    });
  }

  // private setDefaultValue() {
  //   if (this.defaultValue == null) {
  //     return;
  //   }
  //
  //   if (this.defaultValue === '') {
  //     return;
  //   }
  //
  //   const matchesExp = new RegExp('^\\[\\[[0-9]*\\,.*\\]\\]$', 'g');
  //   if (this.defaultValue.match(matchesExp)) {
  //     const replaceExp = new RegExp('^\\[\\[', 'g')
  //     const id = this.defaultValue.replace(new RegExp('^\\[\\[', 'g'), '')
  //       .replace(new RegExp('\,.*\\]\\]', 'g'), '');
  //
  //     const displayValue = this.defaultValue.replace(new RegExp('^\\[\\[[0-9]*\\,', 'g'), '')
  //       .replace(new RegExp('\\]\\]', 'g'), '');
  //
  //     this.value = id;
  //     this.displayValue = displayValue;
  //   }
  // }

  // private setDefaultListValue() {
  //   if (this.listRow == null) {
  //     return;
  //   }
  //
  //   if (this.listRow.length === 0) {
  //     return;
  //   }
  //
  //   if (this.listRow == null) {
  //     return;
  //   }
  //
  //   const commandParts: Map<string, string> = this.commandParserService.parse(this.command);
  //   if (commandParts.has('LIST-DEFAULT-DISPLAY')) {
  //     const displayValues: Map<string, string> = this.commandParserService.parseMapPart(commandParts, 'LIST-DEFAULT-DISPLAY');
  //     const displayValueArray: string[] = [];
  //     for (const [displayValueKey, displayValue] of displayValues) {
  //       if (this.listRow[displayValueKey] != null) {
  //         displayValueArray.push(this.listRow[displayValueKey]);
  //       }
  //     }
  //     this.displayValue = displayValueArray.join(' ');
  //   }
  // }

  /*
   * This function returns the componentPersistEntity list for this List Selector
   * ex. If this list selector is on a form table, the componentPersistEntity is not the general one
   * But the one with selection of its table line components
   * */
  // private defineComponentPersistEntityListFromTree(cpeList: ComponentPersistEntityDTO[]): ComponentPersistEntityDTO[] {
  //   if (cpeList == null) {
  //     return null;
  //   }
  //
  //   let lineUpdated = false;
  //   const newCpeList: ComponentPersistEntityDTO[] = [];
  //
  //   cpeList
  //     .forEach(cpe => {
  //       if (cpe.id === this.lineComponentPersistEntity.id) {
  //         lineUpdated = true;
  //         cpe.componentPersistEntityList = this.lineComponentPersistEntity.componentPersistEntityList;
  //         cpe.componentPersistEntityFieldList = this.lineComponentPersistEntity.componentPersistEntityFieldList;
  //         newCpeList.push(cpe);
  //       } else {
  //         newCpeList.push(cpe);
  //       }
  //     });
  //
  //   if (lineUpdated) {
  //     return newCpeList;
  //   }
  //
  //   newCpeList
  //     .forEach(newCpe => {
  //       const childCpeList = this.defineComponentPersistEntityListFromTree(newCpe.componentPersistEntityList);
  //       newCpe.componentPersistEntityList = childCpeList;
  //     });
  //
  //   return newCpeList;
  // }

  // private setComponentDislpayValue(): void {
  //
  //   this.selectedComponentPersistEntity.componentPersistEntityDataLines.forEach(dataline => {
  //     // this.displayValue = '';
  //     const displayValueArray: string[] = [];
  //     dataline.componentPersistEntityFieldList.forEach(componentPersistEntityField => {
  //       if (componentPersistEntityField.value != null) {
  //         displayValueArray.push(componentPersistEntityField.value);
  //       }
  //     });
  //   });
  //
  //   // this.displayValue = '';
  //   // const displayValueArray: string[] = [];
  //   // this.componentPersistEntityFieldList.forEach(componentPersistEntityField => {
  //   //   if (componentPersistEntityField.value != null) {
  //   //     displayValueArray.push(componentPersistEntityField.value);
  //   //   }
  //   // });
  //   // this.displayValue = displayValueArray.join('  ');
  // }

  // setReturnDisplayValues(returnDisplay) {
  //   if (returnDisplay === '' ) {
  //     return;
  //   }
  //   this.displayValue = returnDisplay;
  // }

  // keyOpenPage(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     this.openList();
  //   }
  // }
  //
  // onKeyDown($event: KeyboardEvent) {
  //   this.keyDownChange.emit($event);
  // }

  // clear() {
  //   this.value = null;
  //   this.componentPersistEntityFieldList = [];
  //   this.displayValue = '';
  //   this.valueChange.emit(this.value);
  //   if (this.selectedComponentPersistEntity != null) {
  //     this.clearComponentPersistEntityTree(this.selectedComponentPersistEntity);
  //   }
  //   this.eventOccuredActions('listcleared', null);
  // }

  // clearComponentPersistEntityTree(componentPersistEntity: ComponentPersistEntityDTO) {
  //   componentPersistEntity.componentPersistEntityFieldList.forEach(cpef => {
  //     cpef.value = null;
  //   });
  //
  //   if (componentPersistEntity.componentPersistEntityList == null) {
  //     return null;
  //   }
  //
  //   componentPersistEntity.componentPersistEntityList.forEach(cpe => {
  //     this.clearComponentPersistEntityTree(cpe);
  //   });
  // }

  // openForm() {
  //   let command = '';
  //   let newTabCommandPart = '';
  //
  //   if (this.openFormOnNewTab) {
  //     newTabCommandPart = ',TAB:new,SIDEBAR-STATUS:minimized';
  //   }
  //   if (this.value == null) {
  //     command = 'FORM[LOCATE:(ID=3)' + newTabCommandPart + ']';
  //   } else {
  //     command = 'FORM[LOCATE:(ID=3;SELECTION-ID=' + this.value + ')' + newTabCommandPart + ']';
  //   }
  //
  //   this.commandNavigatorService.navigate(command);
  // }

  // findPersistEntityOnListTree(componentPersistEntityList: ComponentPersistEntityDTO[], code: string) {
  //   componentPersistEntityList.forEach(componentPersistEntity => {
  //     if (componentPersistEntity.code === code) {
  //       this.selectedComponentPersistEntity = componentPersistEntity;
  //       return true;
  //     }
  //
  //     if (componentPersistEntity.componentPersistEntityList != null) {
  //       const found = this.findPersistEntityOnListTree(componentPersistEntity.componentPersistEntityList, code);
  //
  //       if (found) {
  //         return found;
  //       }
  //     }
  //
  //   });
  //   return false;
  // }


  // private retrieveDisplayFields(): void {
  //   this.componentPersistEntityFieldList = [];
  //
  //   this.displayFieldNames
  //     .forEach(displayFieldName => {
  //       const componentPersistEntityList = this.defineComponentPersistEntityList();
  //       this.retrieveDisplayFieldsOnTree(componentPersistEntityList, displayFieldName);
  //     });
  // }

  // private retrieveDisplayFieldsOnTree(componentPersistEntityList: ComponentPersistEntityDTO[], displayFieldName: string): boolean {
  //
  //   componentPersistEntityList
  //     .forEach(componentPersistEntity => {
  //       componentPersistEntity.componentPersistEntityFieldList
  //         .forEach(cpef => {
  //           const currentfield = componentPersistEntity.code + '.' + cpef.code;
  //           if (displayFieldName === currentfield) {
  //             this.componentPersistEntityFieldList.push(cpef);
  //             return true;
  //           }
  //         });
  //
  //       if (componentPersistEntity.componentPersistEntityList != null) {
  //         const found = this.retrieveDisplayFieldsOnTree(componentPersistEntity.componentPersistEntityList, displayFieldName);
  //         if (found === true) {
  //           return true;
  //         }
  //       }
  //     });
  //
  //   return false;
  // }

  eventOccuredActions(eventtype: string, event: any) {

    this.eventOccured.emit(
      {
        entityCode: (this.componentPersistEntity == null ? '' : this.componentPersistEntity.code),
        fieldCode: (this.componentPersistEntityFieldDTO == null ? '' : this.componentPersistEntityFieldDTO.code),
        eventtype: eventtype,
        event: event
      }
    );

  }

  focusTriggered($event: FocusEvent) {
    this.focusEvent.emit($event);
  }


}
