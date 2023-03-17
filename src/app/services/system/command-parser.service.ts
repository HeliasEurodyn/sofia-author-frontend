import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandParserService {

  constructor() {
  }

  public getType(command: string): String {
    command = command.toUpperCase();
    if (command.length === 0) {
      return null;
    }

    const commandType = command.replace(/\[.*/, '');

    return commandType;
  }

  public parse(command: string): Map<string, string> {

    /*
    *
    * Check if the command is in JSon Format
    * if it is, parse Json and Return Map.
    * If not, parse our custom command format and Return Map.
    *
    * */
    const parsedCommand = this.tryParseJSONObject(command);
    if(parsedCommand != false){
        return new Map(Object.entries(parsedCommand));  ;
    }

    if (command.length === 0) {
      return null;
    }

    if (this.verifyBrackets(command) === false) {
      return null;
    }


    const index = command.indexOf('[');

    if (index <= 0) {
      return;
    }

    let commandInsideBrackets = command.replace(/.*\[|\].*/, '');
    commandInsideBrackets = commandInsideBrackets.replace(/.*\[|\].*/, '');
    if (commandInsideBrackets.length === 0) {
      return;
    }

    const commandParameters = commandInsideBrackets.split(',');
    const commandParametersKeyValMap: Map<string, string> = new Map();
    for (const commandParameter of commandParameters) {

      const commandParameterKeyVal: string[] = commandParameter.split(':');
      commandParametersKeyValMap.set(commandParameterKeyVal[0], commandParameterKeyVal[1]);
    }

    const commandType: String = this.getType(command);
    commandParametersKeyValMap.set('COMMAND-TYPE', commandType.toString());

    return commandParametersKeyValMap;
  }

  private tryParseJSONObject(jsonString){
    try {
      var o = JSON.parse(jsonString);

      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { }

    return false;
  }

  private verifyBrackets(command: string) {
    const bracketOpenLength = (command.match(/\[/) || []).length;
    const bracketCloseLength = (command.match(/\]/) || []).length;

    if (bracketOpenLength !== 1 || bracketCloseLength !== 1) {
      return false;
    } else {
      return true;
    }
  }

  public parsePart(command: string, paramPart: string): Map<string, string> {
    const params: Map<string, string> = this.parse(command);
    return this.parseMapPart(params, paramPart);
  }

  public parseMapPart(params: Map<string, string> = new Map(), paramPart: string): Map<string, string> {
    const locateValuesKeyValMap: Map<string, string> = new Map();

    if (params.has(paramPart)) {
      const locateValues = params.get(paramPart);
      let locateValuesInsideBrackets = locateValues.replace(/.*\(|\).*/, '');
      locateValuesInsideBrackets = locateValuesInsideBrackets.replace(/.*\(|\).*/, '');
      const locateValuesSplited = locateValuesInsideBrackets.split(';');
      for (const locateValueSplited of locateValuesSplited) {
        const locateValuesKeyVal: string[] = locateValueSplited.split('=');
        locateValuesKeyValMap.set(locateValuesKeyVal[0], locateValuesKeyVal[1]);
      }
    }
    return locateValuesKeyValMap;
  }

  public parseListPart(params: Map<string, string> = new Map(), paramPart: string): string[] {
    const locateValuesKeyValMap: string[] = [];
    if (params.has(paramPart)) {
      const locateValues = params.get(paramPart);
      let locateValuesInsideBrackets = locateValues.replace(/.*\(|\).*/, '');
      locateValuesInsideBrackets = locateValuesInsideBrackets.replace(/.*\(|\).*/, '');
      const locateValuesSplited = locateValuesInsideBrackets.split(';');

      for (const locateValueSplited of locateValuesSplited) {
        const locateValuesKeyVal: string[] = locateValueSplited.split('=');
        locateValuesKeyValMap.push(locateValuesKeyVal[0]);
      }
    }
    return locateValuesKeyValMap;
  }

  mapToCommand(command: any, parameter: string, pageId: string) {
    return command.replace(parameter, pageId);
  }

  public addParameter(command: string, parameter: string ): string {

    //  command = command.toUpperCase();
    if (command.length === 0) {
      return command;
    }

    if (this.verifyBrackets(command) === false) {
      return command;
    }

    const index = command.indexOf('[');

    if (index <= 0) {
      return command;
    }

    let commandInsideBrackets = command.replace(/.*\[|\].*/, '');
    commandInsideBrackets = commandInsideBrackets.replace(/.*\[|\].*/, '');

    const commandType: String = this.getType(command);

    return commandType + '[' + commandInsideBrackets + ',' + parameter + ']';
  }

}
