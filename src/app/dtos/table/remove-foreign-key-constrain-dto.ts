import {ForeignKeyConstrainDTO} from './foreign-key-constrain-dto';
import {TableDTO} from './tableDTO';

export class RemoveForeignKeyConstrainDTO {

  private foreignKeyConstrainDTO: ForeignKeyConstrainDTO;
  private tableDTO: TableDTO;
  constructor() {
  }

  public getForeignKeyConstrainDTO(): ForeignKeyConstrainDTO {
    return this.foreignKeyConstrainDTO;
  }

  public setForeignKeyConstrainDTO(value: ForeignKeyConstrainDTO) {
    this.foreignKeyConstrainDTO = value;
  }

  public getTableDTO(): TableDTO {
    return this.tableDTO;
  }

  public  setTableDTO(value: TableDTO) {
    this.tableDTO = value;
  }
}
