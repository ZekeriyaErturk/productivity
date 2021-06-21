import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  eventRef: AngularFirestoreCollection;
  constructor(public firesStore: AngularFirestore) {
    this.eventRef = firesStore.collection('events');
  }

  listEvents() {
    return this.eventRef.snapshotChanges();
  }

  eventByUid(uid: string) {
    return this.firesStore
      .collection('events', (ref) => ref.where('eventUid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const id = a.payload.doc.id;
            const data: Object = a.payload.doc.data();
            return { id, ...data };
          })
        )
      );
  }

  addEvent(event: Event) {
    return this.eventRef.add(event);
  }

  updateEvent(event: Event) {
    return this.eventRef.doc(event.id).update(event);
  }

  deleteEvent(eventId: string) {
    return this.eventRef.doc(eventId).delete();
  }
}
