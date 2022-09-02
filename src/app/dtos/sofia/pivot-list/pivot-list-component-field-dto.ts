import {ListComponentFieldDTO} from '../list/list-component-field-d-t-o';
import {FilterField} from './filter-field';

export class PivotListComponentFieldDTO extends ListComponentFieldDTO {
  public filterFields: FilterField[] = [];
  public isFullChecked = true;
}
