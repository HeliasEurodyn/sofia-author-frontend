import {BaseDTO} from '../common/base-dto';
import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {FormControlTableControlDTO} from './form-control-table-control-d-t-o';
import {FormControlTableLineDTO} from './form-control-table-line-d-t-o';

export class FormControlTableDTO extends BaseDTO {

  description: string;
  visible: Boolean;
  editable: Boolean;
  required: Boolean;
  css: string;

  public formControlButtons: FormControlTableControlDTO[] = [];
  public componentPersistEntity: ComponentPersistEntityDTO;
  public formControls: FormControlTableControlDTO[] = [];
  public formControlLines: FormControlTableLineDTO[] = [];

  constructor() {
    super();
  }

}
