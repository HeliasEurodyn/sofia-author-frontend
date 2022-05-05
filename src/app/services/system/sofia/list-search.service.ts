import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListSearchService {

  public listSearchEmmiter: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.listSearchEmmiter = new EventEmitter();
  }
}
