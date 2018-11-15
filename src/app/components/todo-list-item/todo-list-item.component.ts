import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TodoItem } from 'app/interfaces';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: [ './todo-list-item.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {

  @Input()
  public todoItem: TodoItem;

  @Output()
  public changeTodo: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  @Output()
  public deleteTodo: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();


  public get todoItemId(): string {
    return this.todoItem.id;
  }

  public onChange(): void {
    this.changeTodo.emit(this.todoItem);
  }

  public onDeleteClick(): void {
    this.deleteTodo.emit(this.todoItem);
  }

}