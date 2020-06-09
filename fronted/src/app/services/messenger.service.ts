import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  subject = new Subject();

  constructor() {}

  sendMessage(product) {
    this.subject.next(product); //Triggering an event
  }

  getMessage() {
    return this.subject.asObservable();
  }
}
