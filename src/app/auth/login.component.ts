import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  erroMessage: string = '';
  gData: object = {};

  constructor(private loginSrv: LoginService, private router: Router, private dataSrv: DataService) {
    localStorage.removeItem('loggedInUserName');
    this.dataSrv.globalDataObser.subscribe((data: object) => {
      this.gData = data;
    });
  }

  async onSubmit() {
    this.loginSrv.login(this.loginForm.value).
      subscribe((res: any) => {
        if(res?.status === 'SUCCESS') {
          // localStorage.setItem('loggedInUserName', res.data.name);
          this.dataSrv.setGlobalData({...this.gData, ...{'loggedInUserName': res.data.name}});
          this.router.navigate(['/todo']);
        } else {
          this.erroMessage = 'Invalid credential!';
        }
      });
  }
}
