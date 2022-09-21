import {BaseDTO} from '../../common/base-dto';

export class TimelineDTO extends  BaseDTO {
  title: string;
  description: string;
  icon: string;
  query: string;
  hasPagination: boolean;
  pageSize: number;
  isTheLastPage: boolean;
}
