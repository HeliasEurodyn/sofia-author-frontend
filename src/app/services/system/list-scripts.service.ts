import {Injectable} from '@angular/core';
import {DynamicJavaScriptLoaderService} from './dynamic-java-script-loader.service';
import {CommandNavigatorService} from './command-navigator.service';
import {DynamicStaticJavascriptLoaderService} from './dynamic-static-javascript-loader.service';
import {DynamicRequestService} from '../crud/dynamic-request.service';

declare function registerListDynamicScript(id, list): any;

declare function nativeListEventsHandler(id, type: string, metadata: any): any;

declare function listNativeRowButtonClickHandler(id, fieldCode: string, row: string[]): any;

declare function listNativeHeaderButtonClickHandler(id, fieldCode: string): any;

declare function defineListNavigator(id, callback: ((command: string) => any)): void;

declare function defineListGetFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineListGetFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineListPostToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineListPostToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineListPutToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineListPutToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineListDeleteFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineListDeleteFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function calcPivotValueBranch(id, field, rows: Array<string[]>, leftArrayLine, topArrayLine): any;

declare function pivotCellClick(id, field): any;



@Injectable({
  providedIn: 'root'
})
export class ListScriptsService {

  constructor(private dynamicJavaScriptLoader: DynamicJavaScriptLoaderService,
              private dynamicRequestService: DynamicRequestService,
              private navigatorService: CommandNavigatorService,
              private staticJavascriptLoader: DynamicStaticJavascriptLoaderService) {
  }

  loadWithPromise(list: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.staticJavascriptLoader.addScript('list').then(result => {
        this.dynamicJavaScriptLoader.addScript(list.listDto.id, 'list').then(data => {
          registerListDynamicScript(list.listDto.id, list);
          defineListNavigator(list.listDto.id, this.navigateToCommand);
          defineListGetFromBackend(list.listDto.id, this.getFromBackend);
          defineListGetFromUrl(list.listDto.id, this.getFromUrl);
          defineListPostToBackend(list.listDto.id, this.postToBackend);
          defineListPostToUrl(list.listDto.id, this.postToUrl);
          defineListPutToBackend(list.listDto.id, this.putToBackend);
          defineListPutToUrl(list.listDto.id, this.putToUrl);
          defineListDeleteFromBackend(list.listDto.id, this.deleteFromBackend);
          defineListDeleteFromUrl(list.listDto.id, this.deleteFromUrl);
          this.triggerListEvent(list.listDto.id, 'onListOpen', '');
          resolve({script: 'listScript', loaded: true, status: 'Loaded'});
        }).catch(error => console.log(error));
      });
    });
  }

  public triggerListEvent(id, type: string, metadata: any) {
    nativeListEventsHandler(id, type, metadata);
  }

  public listNativeRowButtonClickHandler(id, code: string, row: string[]) {
    listNativeRowButtonClickHandler(id, code, row);
  }

  public listNativeHeaderButtonClickHandler(id, code: string) {
    listNativeHeaderButtonClickHandler(id, code);
  }

  public navigateToCommand = (command: string) => {
    this.navigatorService.navigate(command);
  };

  /*
 *  Get data from backend url
 * */
  public getFromBackend = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.getFromBackend(url).subscribe(data => {
      callback(data);
    });
  };


  /*
 *  Get data from  url
 * */
  public getFromUrl = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.getFromUrl(url).subscribe(data => {
      callback(data);
    });
  };



  public postToBackend = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.postToBackend(url, data).subscribe(response => {
      callback(response);
    });
  };

  public postToUrl = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.postToUrl(url, data).subscribe(response => {
      callback(response);
    });
  };

  public putToBackend = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.putToBackend(url, data).subscribe(response => {
      callback(response);
    });
  };

  public putToUrl = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.putToUrl(url, data).subscribe(response => {
      callback(response);
    });
  };

  public deleteFromBackend = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.deleteFromBackend(url).subscribe(data => {
      callback(data);
    });
  };

  public deleteFromUrl = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.deleteFromUrl(url).subscribe(data => {
      callback(data);
    });
  };

  public calcPivotValueBranch( id,
                              field,
                              rows: Array<string[]>,
                              leftArrayLine,
                              topArrayLine) {
   return calcPivotValueBranch(id, field, rows, leftArrayLine, topArrayLine);
  }

  public pivotCellClick(id, field) {
    pivotCellClick(id, field);
  }

}
