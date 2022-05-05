import {BaseDTO} from '../../common/base-dto';
import {FlowboardItemDTO} from './flowboard-item-dto';

export class FlowboardDTO extends BaseDTO {

  public description: string;

  public flowboardItemList: FlowboardItemDTO[];

}
