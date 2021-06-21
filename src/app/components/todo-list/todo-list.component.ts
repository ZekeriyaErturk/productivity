import { MessageService } from 'primeng/api';
import { AuthService } from './../../services/auth.service';

import { Todo } from './../../models/Todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import ThirdPartyDraggable from '@fullcalendar/interaction/interactions-external/ThirdPartyDraggable';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos;
  todo: string;
  user: any;

  constructor(
    public todoServis: TodoService,
    public authServis: AuthService,
    public messageServis: MessageService
  ) {
    this.authServis.GetUser().subscribe((res) => {
      this.user = { id: res?.uid || null, name: res?.displayName || null };

      if (this.user.id !== null) {
        this.todoServis.todoByUid(this.user.id).subscribe((res) => {
          this.todos = res;
        });
      } else {
        this.todos = [];
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.user.name) {
      this.todoServis.addTodo({
        todo: this.todo,
        todoDate: new Date().toString(),
        todoDone: false,
        todoUid: this.user.id,
        todoUser: this.user.name,
      });
    } else {
      this.messageServis.add({
        severity: 'error',
        summary: 'Giriş Yapın!',
        detail: 'Todo Ekleye Bilmek İçin Giriş Yapmalısınız',
      });
    }
    this.todo = '';
  }

  doneTodo(todo: Todo) {
    todo.todoDone = !todo.todoDone;
    this.todoServis.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoServis.deleteTodo(todo);
  }
}
