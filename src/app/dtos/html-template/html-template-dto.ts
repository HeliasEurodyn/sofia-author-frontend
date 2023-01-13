import { BaseDTO } from "../common/base-dto";
import { ComponentDTO } from "../component/componentDTO";


export class HtmlTemplateDTO extends BaseDTO{
  title: string;
  description: string;
  component: ComponentDTO;
  html: string;
  
  constructor() {
    super();
    this.html = "";
  }
}
