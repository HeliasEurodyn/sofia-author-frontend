import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorResponceService {

  public httpErrorMessageEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  setNewErrorMessage(message: string) {
    this.httpErrorMessageEmitter.emit(message);
  }

}
