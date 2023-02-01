import {BaseDTO} from '../common/base-dto';
import {TableDTO} from './tableDTO';
import {TableFieldDTO} from './table-field-dto';

export class ForeignKeyConstrainDTO extends BaseDTO {

  name: String
  referredTable: TableDTO
  referredField: TableFieldDTO;
  fieldName: String;

  onUpdate: String;
  onDelete: String;


}
