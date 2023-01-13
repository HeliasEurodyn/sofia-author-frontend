import { BaseDTO } from "../common/base-dto";

export class CalendarDTO extends BaseDTO{
  title: string;
  description: string;
  icon: string;
  query: string;
}
