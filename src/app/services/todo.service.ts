import { Todo } from './../models/Todo';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoRef: AngularFirestoreCollection;
  constructor(private angularFirestore: AngularFirestore) {
    this.todoRef = this.angularFirestore.collection('todo');
  }

  listTodo() {
    return this.todoRef.snapshotChanges();
  }

  todoByUid(uid: string) {
    return this.angularFirestore
      .collection('todo', (ref) => ref.where('todoUid', '==', uid))
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

  addTodo(todo: Todo) {
    return this.todoRef.add(todo);
  }

  updateTodo(todo: Todo) {
    return this.todoRef.doc(todo.id).update(todo);
  }

  deleteTodo(todo: Todo) {
    return this.todoRef.doc(todo.id).delete();
  }
}
