import { BaseDTO } from "../common/base-dto";
import { ListDTO } from "../list/list-dto";
import { RestDocumentationEndpointDTO } from "./rest-documentation-endpoint/rest-documentation-endpoint-dto";

export class RestDocumentationDTO extends BaseDTO{
    title: string;
    description: string;
    active: boolean;
    public restDocumentationEndpoints: RestDocumentationEndpointDTO[] = [];
}
