import { BaseDTO } from "../../common/base-dto";

export class ExcludeEndpointFieldDTO extends BaseDTO {
   trim() {
     throw new Error('Method not implemented.');
   }

   public  excludeField: string;

}