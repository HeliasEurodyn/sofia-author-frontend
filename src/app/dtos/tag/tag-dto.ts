import {BaseDTO} from '../common/base-dto';

export class TagDTO extends BaseDTO {

  title: string;
  description: string;

  constructor(title?: string) {
    super();
    this.title = title;
  }

}
