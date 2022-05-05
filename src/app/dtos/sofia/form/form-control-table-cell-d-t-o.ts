import {BaseDTO} from '../../common/base-dto';
import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {FormControlTableControlDTO} from './form-control-table-control-d-t-o';
import {ComponentPersistEntityFieldDTO} from '../component/component-persist-entity-field-dto';

export class FormControlTableCellDTO extends BaseDTO {

  public formControl: FormControlTableControlDTO;
  public componentPersistEntityField: ComponentPersistEntityFieldDTO;
  public componentPersistEntity: ComponentPersistEntityDTO

}
