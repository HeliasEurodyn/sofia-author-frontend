import {BaseDTO} from '../../common/base-dto';
import {FormControlTableCellDTO} from './form-control-table-cell-d-t-o';
import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {ComponentPersistEntityDataLineDTO} from '../component/component-persist-entity-data-line-dto';

export class FormControlTableLineDTO extends BaseDTO {

  public formControlCells: FormControlTableCellDTO[] = [];
  public componentPersistEntity: ComponentPersistEntityDTO;
  public componentPersistEntityDataLine: ComponentPersistEntityDataLineDTO;

  constructor() {
    super();
    this.formControlCells = [];
  }


}
