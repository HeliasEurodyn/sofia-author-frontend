import { BaseDTO } from "../common/base-dto";
import { ListDTO } from "../list/list-dto";
import { RestDocumentationEndpoint } from "./rest-documentation-endpoint";

export class RestDocumentationDTO extends BaseDTO{
    title: string;
    description: string;
    active: boolean;
    public restDocumentationEndpoints: RestDocumentationEndpoint[] = [];
}
