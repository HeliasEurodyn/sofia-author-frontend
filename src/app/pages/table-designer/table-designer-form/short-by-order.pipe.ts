import { Pipe, PipeTransform } from '@angular/core';
import {ForeignKeyConstrainDTO} from '../../../dtos/table/foreign-key-constrain-dto';

@Pipe({
  name: 'shortByOrder'
})
export class ShortByOrderPipe implements PipeTransform {

  transform(value: ForeignKeyConstrainDTO[]): ForeignKeyConstrainDTO[] {
    return value?.sort((fk1, fk2) => {
      return fk1?.shortOrder - fk2?.shortOrder;
    });
  }

}
