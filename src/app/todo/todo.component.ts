import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HttpClientModule, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todoList: {id: number, content: string}[];
  displayedColumns: string[] = ['id', 'content', 'updatedAt', 'action'];
  isLoggedIn = false;
  message: string = '';
  isFormOpen: boolean = false;
  todoId: number|null = null;
  todoForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(private todoSrv: TodoService, private dataSrv: DataService){
    this.todoList = [];
    const loggedUserLS = localStorage.getItem('loggedInUserName');
    if(loggedUserLS !== 'Guest') {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.dataSrv.globalDataObser.subscribe((data: any) => {
      for(let item in data) {
        if(item === 'loggedInUserName') {
          localStorage.setItem('loggedInUserName', data[item]);
          this.isLoggedIn = false;
          if(data[item] !== 'Guest') {
            this.isLoggedIn = true;
          }
        }
      }
    });
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoSrv.getAllTodos().subscribe((data: any) => {
      if(data.status === 'SUCCESS') {
        this.todoList = data.data;
      }
    });
  }

  deleteTodoItem(id: number) {
    if(confirm("Are sure to delete ?")) {
      this.todoSrv.deleteTodo(id).subscribe((data: any) => {
        if(data.status === 'SUCCESS') {
          this.message = data.message;
          this.getAllTodos();
        }
      });
    }
  }

  onSubmit() {
    if(this.todoId) {
      this.todoSrv.updateTodo({...this.todoForm.value, ...{id: this.todoId}}).
      subscribe((res: any) => {
        if(res?.status === 'SUCCESS') {
          this.message = res.message;
          this.getAllTodos();
          this.todoForm.reset();
          this.isFormOpen = false;
          this.todoId = null;
        } else {
          this.message = 'Request not executed !';
        }
      });
    } else {
      this.todoSrv.addTodo(this.todoForm.value).
      subscribe((res: any) => {
        if(res?.status === 'SUCCESS') {
          this.message = res.message;
          this.getAllTodos();
          this.todoForm.reset();
          this.isFormOpen = false;
          this.todoId = null;
        } else {
          this.message = 'Request not executed !';
        }
      });
    }
  }

  openForm(id: number | null) {
    this.isFormOpen = true;
    if(id) {
      this.todoList.forEach((item: any) => {
        if(item.id === id) {
          this.todoForm.controls['content'].setValue(item.content);
        }
      })
      this.todoId = id;
    } else {
      this.todoId = null;
    }
  }
}
