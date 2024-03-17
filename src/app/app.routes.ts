import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: 'todo', component: TodoComponent},
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', component: TodoComponent},
  {path: 'home', component: HomeComponent},
];
