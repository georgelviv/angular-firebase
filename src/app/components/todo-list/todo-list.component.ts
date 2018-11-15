import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs/Subscription';

import { TodoItem } from 'app/interfaces';
import { TODO_ITEMS_COLLECTION } from 'app/globals';
  
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [ './todo-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todoItems: TodoItem[];

  private todoItemsSubscription: Subscription;

  constructor(
    private db: AngularFirestore,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.subscribeForTodoItems();
  }

  public ngOnDestroy(): void {
    this.todoItemsSubscription.unsubscribe();
  }

  public get isEmpty(): boolean {
    return this.todoItems
      ? this.todoItems.length === 0
      : false;
  }

  public subscribeForTodoItems(): void {
    this.todoItemsSubscription = this.db.collection(TODO_ITEMS_COLLECTION).valueChanges()
      .subscribe((todoItems: TodoItem[]) => {
        this.todoItems = todoItems.sort((a, b) => b.date - a.date);
        this.cd.detectChanges();
      });
    
  }

  public onTodoItemChange(todoItem: TodoItem): void {
    const todoItemUpdated: TodoItem = {...todoItem, isDone: !todoItem.isDone};

    this.db
      .collection(TODO_ITEMS_COLLECTION)
      .doc<TodoItem>(String(todoItem.id)).update(todoItemUpdated);
  }

  public onTodoItemDelete(todoItem: TodoItem): void {
    this.db
      .collection(TODO_ITEMS_COLLECTION)
      .doc<TodoItem>(String(todoItem.id)).delete();
  }

}