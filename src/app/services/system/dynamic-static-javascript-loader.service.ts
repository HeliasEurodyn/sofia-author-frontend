import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicStaticJavascriptLoaderService {

  constructor() {
  }

  public addScript(type: String) {
    if (this.checkIfScriptExists(type)) {
      return new Promise((resolve, reject) => {
        resolve({script: name, loaded: true, status: 'Loaded'});
      });
    }

    return Promise.resolve(this.loadScript(type));
  }

  private loadScript(type: String) {
    return new Promise((resolve, reject) => {
      const jwtToken = localStorage.getItem('jwt_token');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${environment.serverUrl}/${type}/dynamic-javascripts/factory.js?wtk=${jwtToken}`;
      script.id = 'dynamic=' + type + '-factory-javascript';

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

  public checkIfScriptExists(type: String) {
    if (document.getElementById('dynamic=' + type + '-factory-javascript') != null) {
      return true;
    }
    return false;
  }
}
