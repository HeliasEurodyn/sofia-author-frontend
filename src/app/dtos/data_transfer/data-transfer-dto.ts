import {BaseDTO} from '../common/base-dto';

export class DataTransferDTO extends BaseDTO {
  public name: string;
  public currentVersion: number;
  public description: string;

  public formIds: any[] = [];
  public listIds: any[] = [];
  public menuIds: any[] = [];
  public componentIds: any[] = [];
  public tableIds: any[] = [];
  public viewIds: any[] = [];
  public appViewIds: any[] = [];
  public chartIds: any[] = [];
  public infoCardIds: any[] = [];
  public htmlPartIds: any[] = [];
  public dashboardIds: any[] = [];
  public reportIds: any[] = [];
  public xlsImportIds: any[] = [];
  public searchIds: any[] = [];
  public customQueryIds: any[] = [];
  public languageIds: any[] = [];
  public roleIds: any[] = [];
  public userIds: any[] = [];

}
