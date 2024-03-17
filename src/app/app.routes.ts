import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {path: 'todo', component: TodoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', component: TodoComponent},
];
