import {BaseDTO} from '../common/base-dto';
import {ComponentPersistEntityFieldDTO} from '../component/component-persist-entity-field-dto';
import {ComponentPersistEntityDTO} from '../component/component-persist-entity-dto';
import {ListComponentFieldTranslationDTO} from './translation/list-component-field-translation-dto';

export class ListComponentFieldDTO extends BaseDTO {
  public code: string;
  editor: string;
  description: string;
  type: string
  mask: string
  public componentPersistEntity: ComponentPersistEntityDTO;
  public componentPersistEntityField: ComponentPersistEntityFieldDTO;
  visible: Boolean;
  editable: Boolean;
  headerEditable: Boolean;
  editableRelFieldCode: string;
  headerFilter: Boolean;
  required: Boolean;
  defaultValue: string;
  displayValue: string;
  decimals: number;
  fieldtype: string;
  shortLocation: string;
  operator: string;
  bclass: string;
  css: string;
  fieldValue: any;
  formulaType: string;
  public listComponentActionFieldList: ListComponentFieldDTO[] = [];

  public translations: ListComponentFieldTranslationDTO[] = [];
}
