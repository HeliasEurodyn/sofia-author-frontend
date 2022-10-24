import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicCssScriptLoaderService {

  constructor() {
  }

  public addScript(scriptId: string, type: string): Promise<any> {
    return Promise.resolve(this.loadScript(scriptId, type));
  }

  private loadScript(scriptId: string, type: string) {
    return new Promise((resolve, reject) => {
      const jwtToken = localStorage.getItem('jwt_token');
      const script = document.createElement('link');
      script.rel = 'stylesheet';
      script.href = `${environment.serverUrl}/${type}/dynamic-cssscript/${scriptId}/script.css?wtk=${jwtToken}`;
      script.id = type + '-dynamic-cssscript_' + scriptId;
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
  //   if (document.getElementById(type + '-dynamic-cssscript') != null) {
  //     document.getElementById(type + '-dynamic-cssscript').remove();
  //   }
  // }

  public checkIfScriptExists(scriptId: number, type: string) {
    if (document.getElementById(type + '-dynamic-cssscript_' + scriptId) != null) {
      return true;
    }
    return false;
  }

}
