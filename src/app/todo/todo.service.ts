import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodos() {
    return this.httpClient.get('http://localhost:3000/todo');
  }

  deleteTodo(id: number) {
    return this.httpClient.post('http://localhost:3000/todo/delete', {id});
  }

  addTodo(param: any) {
    return this.httpClient.post('http://localhost:3000/todo', param);
  }

  updateTodo(param: any) {
    return this.httpClient.post('http://localhost:3000/todo/update', param);
  }
}
