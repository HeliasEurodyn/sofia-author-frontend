import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicJavaScriptLoaderService {

  constructor() {
  }

  public addScript(scriptId: string, type: string) {
    // this.removeScriptIfExists(type);

    if (this.checkIfScriptExists(scriptId, type)) {
      return new Promise((resolve, reject) => {
        resolve({script: name, loaded: true, status: 'Loaded'});
      });
    }

    return Promise.resolve(this.loadScript(scriptId, type));
  }

  private loadScript(scriptId: String, type: string) {
    return new Promise((resolve, reject) => {
      const jwtToken = localStorage.getItem('jwt_token');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${environment.serverUrl}/${type}/dynamic-javascript/${scriptId}/min/script.js?wtk=${jwtToken}`;
      script.id = type + '-dynamic-javascript_' + scriptId;

      if (script.readyState) {  // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            resolve({script: name, loaded: true, status: 'Loaded'});
          }
        };
      } else {
        script.onload = () => {
          resolve({script: name, loaded: true, status: 'Loaded'});
        };
      }
      script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  // public removeScriptIfExists(type: string) {
  //   if (document.getElementById(type + '-dynamic-javascript') != null) {
  //     document.getElementById(type + '-dynamic-javascript').remove();
  //   }
  // }

  public checkIfScriptExists(scriptId: string, type: string) {
    if (document.getElementById(type + '-dynamic-javascript_' + scriptId) != null) {
      return true;
    }
    return false;
  }

}
