import { BaseDTO } from "../common/base-dto";
import { FormDto } from "../form/form-dto";
import { ListDTO } from "../list/list-dto";

export class RestDocumentationEndpoint extends BaseDTO{
    title: string;
    description: string;
    public list: ListDTO;
    public form: FormDto;
    type: string;
    method: string;
}