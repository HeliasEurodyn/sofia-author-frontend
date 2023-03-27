import {TableFieldDTO} from './table-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';
import {ForeignKeyConstrainDTO} from './foreign-key-constrain-dto';
import { TagDTO } from '../tag/tag-dto';

export class TableDTO extends PersistEntityDTO {

  creationVersion: number;

  indexes: string;

  public tableFieldList: TableFieldDTO[];

  public foreignKeyConstrainList: ForeignKeyConstrainDTO[];

  private entitytype = 'Table';
  
  public tags: TagDTO[] = [];

}
