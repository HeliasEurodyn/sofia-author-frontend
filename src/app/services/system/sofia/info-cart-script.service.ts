import { Injectable } from '@angular/core';
import {DynamicJavaScriptLoaderService} from './dynamic-java-script-loader.service';
import {DynamicRequestService} from '../../crud/sofia/dynamic-request.service';
import {CommandNavigatorService} from './command-navigator.service';
import {DynamicStaticJavascriptLoaderService} from './dynamic-static-javascript-loader.service';

declare function registerInfoCardDynamicScript(id, list): any;

declare function nativeInfoCardEventsHandler(id, type: string, metadata: any): any;

declare function defineInfoCardNavigator(id, callback: ((command: string) => any)): void;

declare function defineInfoCardGetFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineInfoCardGetFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineInfoCardPostToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineInfoCardPostToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineInfoCardPutToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineInfoCardPutToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineInfoCardDeleteFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineInfoCardDeleteFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

@Injectable({
  providedIn: 'root'
})
export class InfoCartScriptService {


  constructor(private dynamicJavaScriptLoader: DynamicJavaScriptLoaderService,
              private dynamicRequestService: DynamicRequestService,
              private navigatorService: CommandNavigatorService,
              private staticJavascriptLoader: DynamicStaticJavascriptLoaderService) {
  }

  loadWithPromise(infoCard: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.staticJavascriptLoader.addScript('info-card').then(result => {
        this.dynamicJavaScriptLoader.addScript(infoCard.dto.id, 'info-card').then(data => {
          registerInfoCardDynamicScript(infoCard.dto.id, infoCard);
          defineInfoCardNavigator(infoCard.dto.id, this.navigateToCommand);
          defineInfoCardGetFromBackend(infoCard.dto.id, this.getFromBackend);
          defineInfoCardGetFromUrl(infoCard.dto.id, this.getFromUrl);
          defineInfoCardPostToBackend(infoCard.dto.id, this.postToBackend);
          defineInfoCardPostToUrl(infoCard.dto.id, this.postToUrl);
          defineInfoCardPutToBackend(infoCard.dto.id, this.putToBackend);
          defineInfoCardPutToUrl(infoCard.dto.id, this.putToUrl);
          defineInfoCardDeleteFromBackend(infoCard.dto.id, this.deleteFromBackend);
          defineInfoCardDeleteFromUrl(infoCard.dto.id, this.deleteFromUrl);
          this.triggerInfoCardEvent(infoCard.dto.id, 'onInfoCardOpen', '');
          resolve({script: 'infoCardScript', loaded: true, status: 'Loaded'});
        }).catch(error => console.log(error));
      });
    });
  }

  public triggerInfoCardEvent(id, type: string, metadata: any) {
    nativeInfoCardEventsHandler(id, type, metadata);
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

}
