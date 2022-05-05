import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
