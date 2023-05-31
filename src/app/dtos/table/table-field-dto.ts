import {PersistEntityFieldDTO} from '../persistEntity/persist-entity-field-dto';

export class TableFieldDTO extends PersistEntityFieldDTO {

  autoIncrement: Boolean;

  primaryKey: Boolean;

  hasDefault: Boolean;

  defaultValue: string;

  isUnsigned: Boolean;

  hasNotNull: Boolean;

  public entitytype = 'TableField';

  onSaveValue: string;

  uiClass: string;

}
