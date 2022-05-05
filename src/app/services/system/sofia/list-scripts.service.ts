import {Injectable} from '@angular/core';
import {DynamicJavaScriptLoaderService} from './dynamic-java-script-loader.service';
import {CommandNavigatorService} from './command-navigator.service';
import {ListComponent} from '../../../pages/sofia/list/list/list.component';
import {DynamicStaticJavascriptLoaderService} from './dynamic-static-javascript-loader.service';
import {DynamicRequestService} from '../../crud/sofia/dynamic-request.service';

declare function registerListDynamicScript(id, list): any;

declare function nativeListEventsHandler(id, type: string, metadata: any): any;

declare function listNativeRowButtonClickHandler(id, fieldCode: string, row: string[]): any;

declare function listNativeHeaderButtonClickHandler(id, fieldCode: string): any;

declare function defineListNavigator(id, callback: ((command: string) => any)): void;

declare function defineListGetFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

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
          this.triggerListEvent(list.listDto.id, 'onListOpen', '');
          resolve({script: 'listScript', loaded: true, status: 'Loaded'});
        }).catch(error => console.log(error));
      });
    });
  }

  // load(list: ListComponent) {
  //   this.staticJavascriptLoader.addScript('list').then(result => {
  //     this.dynamicJavaScriptLoader.addScript(list.listDto.id, 'list').then(data => {
  //       registerListDynamicScript(list.listDto.id, list);
  //       defineListNavigator(list.listDto.id, this.navigateToCommand);
  //       this.triggerListEvent(list.listDto.id, 'onListOpen', '');
  //     }).catch(error => console.log(error));
  //   });
  // }

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

}
