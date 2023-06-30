import { BaseDTO } from "app/dtos/common/base-dto";
import { ListDTO } from "app/dtos/list/list-dto";

export class RestDocumentationEndpointDTO  extends BaseDTO {

    public list: ListDTO;

  public title: String = '';
  public description: String = '';

  constructor() {
    super();
  }
}
