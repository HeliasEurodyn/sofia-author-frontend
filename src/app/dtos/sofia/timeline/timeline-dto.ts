import {BaseDTO} from '../../common/base-dto';
import {ListComponentFieldDTO} from '../list/list-component-field-d-t-o';

export class TimelineDTO extends  BaseDTO {
  title: string;
  description: string;
  icon: string;
  query: string;
  hasPagination: boolean;
  pageSize: number;
  isTheLastPage: boolean;
  filterList: Array<ListComponentFieldDTO>;

  constructor() {
    super();
    this.filterList = new  Array<ListComponentFieldDTO>();
  }
}
