import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalMessageService {

  private subjects = new Map();

  publishMessage(topic, msg) {

    if (!this.subjects.has(topic)) {
      this.subjects.set(topic, new Subject());
    }

    this.subjects.get(topic).next(msg);
  }

  accessMessage(topic) {
    if (!this.subjects.has(topic)) {
      this.subjects.set(topic, new Subject());
    }

    return this.subjects.get(topic).asObservable();
  }

  unsubscribeAll() {
    this.subjects.forEach((value, key: string) => {
      value.complete()
    });
    this.subjects.clear();
    this.subjects = new Map();
  }


  unsubscribeTopic(topic) {
    if (this.subjects.has(topic)) {
      this.subjects.get(topic).complete();
      this.subjects.delete(topic);
    }
  }

  constructor() {
  }
}
