import {ViewFieldDTO} from './view-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';
import { TagDTO } from '../tag/tag-dto';

export class ViewDTO extends PersistEntityDTO {

  query: string;

  public viewFieldList: ViewFieldDTO[];

  private entitytype = 'View';

  public tags: TagDTO[] = [];

  public tag: string;

}
