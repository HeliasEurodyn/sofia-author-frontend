import {ViewFieldDTO} from './view-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';

export class ViewDTO extends PersistEntityDTO {

  query: string;

  public viewFieldList: ViewFieldDTO[];

  private entitytype = 'View';

}
