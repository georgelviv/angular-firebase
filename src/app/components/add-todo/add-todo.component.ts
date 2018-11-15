import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

import { TODO_ITEMS_COLLECTION } from 'app/globals';
import { TodoItem } from 'app/interfaces';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: [ './add-todo.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {

  public todoInput;

  constructor(private db: AngularFirestore) {}

  public onSubmit(form: NgForm): void {
    const id: string = this.db.createId();

    const newTodoItem: TodoItem = {
      name: this.todoInput,
      isDone: false,
      id,
      date: Date.now()
    }

    this.db.collection(TODO_ITEMS_COLLECTION).doc(id).set(newTodoItem);
  }

  public get isSubmitDisabled(): boolean {
    return !(this.todoInput && this.todoInput.length);
  }
}