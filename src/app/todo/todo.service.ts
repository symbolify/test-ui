import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodos() {
    return this.httpClient.get(`${environment.apiUrl}/todo`);
  }

  deleteTodo(id: number) {
    return this.httpClient.post(`${environment.apiUrl}/todo/delete`, {id});
  }

  addTodo(param: any) {
    return this.httpClient.post(`${environment.apiUrl}/todo`, param);
  }

  updateTodo(param: any) {
    return this.httpClient.post(`${environment.apiUrl}/todo/update`, param);
  }
}
