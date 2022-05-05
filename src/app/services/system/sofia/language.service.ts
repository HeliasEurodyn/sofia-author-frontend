import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public languageSelectionEmmiter: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.languageSelectionEmmiter = new EventEmitter();
  }
}
