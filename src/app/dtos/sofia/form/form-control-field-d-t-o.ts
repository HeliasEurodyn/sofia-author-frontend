import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../component/component-persist-entity-field-dto';
import {BaseDTO} from '../../common/base-dto';

export class FormControlFieldDTO extends BaseDTO {

  description: string;
  message: string;
  placeholder: string;
  visible: Boolean;
  editable: Boolean;
  required: Boolean;
  css: string;
  mask: string
  public componentPersistEntity: ComponentPersistEntityDTO;
  public componentPersistEntityField: ComponentPersistEntityFieldDTO;
  public fieldId: number;

  constructor() {
    super();
    this.componentPersistEntity = new ComponentPersistEntityDTO();
    this.componentPersistEntityField = new ComponentPersistEntityFieldDTO();
  }

}
