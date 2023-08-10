import {BaseDTO} from '../common/base-dto';
import {InfoCardScriptDTO} from "../info-card/info-card-script-dto";
import {HtmlDashboardScriptDTO} from "./html-dashboard-script-dto";

export class HtmlDashboardDTO extends BaseDTO {
  code: string;
  name: string;
  html: string;
  scripts: HtmlDashboardScriptDTO[] = [];
}
