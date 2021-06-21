import { Note } from './../models/Note';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotService {
  noteRef: AngularFirestoreCollection;
  constructor(private angularFirestore: AngularFirestore) {
    this.noteRef = angularFirestore.collection('notes');
  }

  listNote() {
    return this.noteRef.snapshotChanges();
  }

  noteByUid(uid: string) {
    return this.angularFirestore
      .collection('notes', (ref) => ref.where('notUid', '==', uid))
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

  getNoteById(noteId) {
    return this.noteRef.doc(noteId).get();
  }

  addNote(note: Note) {
    return this.noteRef.add(note);
  }

  updateNote(note: Note) {
    return this.noteRef.doc(note.id).update(note);
  }

  deleteTodo(note: Note) {
    return this.noteRef.doc(note.id).delete();
  }
}
