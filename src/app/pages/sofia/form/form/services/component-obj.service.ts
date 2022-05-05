import {Injectable} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityDataLineDTO} from '../../../../../dtos/sofia/component/component-persist-entity-data-line-dto';

@Injectable({
  providedIn: 'root'
})
export class ComponentObjService {

  constructor() {
  }

  public getChildPersistEntityIds(componentPersistEntityList: ComponentPersistEntityDTO[], ids: number[]): number[] {
    componentPersistEntityList.forEach(cpe => {
      ids.push(cpe.id);
      if (cpe.componentPersistEntityList != null) {
        ids = this.getChildPersistEntityIds(cpe.componentPersistEntityList, ids);
      }
    });
    return ids;
  }

  public findDatalineByIdInCpe(id: string, componentPersistEntity: ComponentPersistEntityDTO): ComponentPersistEntityDataLineDTO {
    for (const dl of componentPersistEntity.componentPersistEntityDataLines) {
      if (dl.id.toString() === id.toString()) {
        return dl;
      }
    }
    return null;
  }

  public findComponentPersistEntity(code: string, componentPersistEntityList: ComponentPersistEntityDTO[]): ComponentPersistEntityDTO {

    for (const componentPersistEntity of componentPersistEntityList) {
      if (code === componentPersistEntity.code) {
        return componentPersistEntity;
      }

      if (componentPersistEntity.componentPersistEntityList == null) {
        continue;
      }

      const curComponentPersistEntity = this.findComponentPersistEntity(code, componentPersistEntity.componentPersistEntityList);
      if (curComponentPersistEntity != null) {
        return curComponentPersistEntity;
      }
    }

    return null;
  }


}
