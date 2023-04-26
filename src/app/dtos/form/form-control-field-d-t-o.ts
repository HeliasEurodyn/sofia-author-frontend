import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../component/component-persist-entity-field-dto';
import {BaseDTO} from '../common/base-dto';
import {FormControlFieldTranslationDTO} from "./translation/form-control-field-translation-dto";

export class FormControlFieldDTO extends BaseDTO {

  description: string;
  message: string;
  placeholder: string;
  visible: Boolean;
  editable: Boolean;
  required: Boolean;
  headerFilter: Boolean;
  css: string;
  mask: string
  public componentPersistEntity: ComponentPersistEntityDTO;
  public componentPersistEntityField: ComponentPersistEntityFieldDTO;
  public fieldId: string;
  public translations: FormControlFieldTranslationDTO[] = [];

  constructor() {
    super();
    this.componentPersistEntity = new ComponentPersistEntityDTO();
    this.componentPersistEntityField = new ComponentPersistEntityFieldDTO();
  }

}
