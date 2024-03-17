import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl('')
  });
  erroMessage: string = '';

  constructor(private router: Router, private dataSrv: DataService, private registerSrv: RegisterService) {
    localStorage.removeItem('message');
    this.dataSrv.setGlobalData({'loggedInUserName': 'Guest'});
  }

  async onSubmit() {
    this.registerSrv.register(this.registerForm.value).
      subscribe((res: any) => {
        if(res?.status === 'SUCCESS') {
          localStorage.setItem('message', `${this.registerForm.value.name} user registed successfully!`);
          this.router.navigate(['/login']);
        } else {
          this.erroMessage = 'Issue occurred !';
        }
      });
  }
}