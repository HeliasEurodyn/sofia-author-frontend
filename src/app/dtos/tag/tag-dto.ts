import {BaseDTO} from '../common/base-dto';

export class TagDTO extends BaseDTO {

  title: string;
  description: string;
  color: string;

  constructor(title?: string, color?: string) {
    super();
    this.title = title;
    this.color = color;
  }

}
