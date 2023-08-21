import { BaseDTO } from '../../common/base-dto';

export class ExcludeEndpointFieldDTO extends BaseDTO {

   public  excludeField: string;
   trim() {
     throw new Error('Method not implemented.');
   }

}
