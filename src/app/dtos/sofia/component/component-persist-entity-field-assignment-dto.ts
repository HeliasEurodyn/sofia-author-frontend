import {BaseDTO} from '../../common/base-dto';

export class ComponentPersistEntityFieldAssignmentDTO extends BaseDTO {

  editor: string;

  defaultValue: string;

  decimals: number;

  fieldValue: any;

  type: string;
}
