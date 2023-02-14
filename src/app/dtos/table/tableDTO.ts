import {TableFieldDTO} from './table-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';
import {ForeignKeyConstrainDTO} from './foreign-key-constrain-dto';

export class TableDTO extends PersistEntityDTO {

  creationVersion: number;

  indexes: string;

  public tableFieldList: TableFieldDTO[];

  public foreignKeyConstrainList: ForeignKeyConstrainDTO[];

  private entitytype = 'Table';

}
