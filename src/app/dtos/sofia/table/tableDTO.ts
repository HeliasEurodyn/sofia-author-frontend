import {TableFieldDTO} from './table-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';

export class TableDTO extends PersistEntityDTO {

  creationVersion: number;

  indexes: string;

  public tableFieldList: TableFieldDTO[];

  private entitytype = 'Table';

}
