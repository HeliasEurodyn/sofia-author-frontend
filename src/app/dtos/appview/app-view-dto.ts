import {AppViewFieldDTO} from './app-view-field-dto';
import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';

export class AppViewDTO extends PersistEntityDTO {

  query: string;

  public appViewFieldList: AppViewFieldDTO[];

  public entitytype = 'AppView';

}
