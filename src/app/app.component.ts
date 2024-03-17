import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loggedInUserName = 'Guest';
  gData: object = {};
  constructor(private dataSrv: DataService) {
    this.dataSrv.globalDataObser.subscribe((data: object) => {
      this.gData = data;
    });
  }
  
  ngOnInit() {
    const loggedUserLS = localStorage.getItem('loggedInUserName');
    if(loggedUserLS) {
      this.loggedInUserName = loggedUserLS;
    }
    this.dataSrv.globalDataObser.subscribe((data: any) => {
      for(let item in data) {
        if(item === 'loggedInUserName') {
          this.loggedInUserName = data[item];
          localStorage.setItem('loggedInUserName', this.loggedInUserName);
        }
      }
    });
    
    // if(!this.loggedInUserName || this.loggedInUserName === 'Guest') {
    //   localStorage.removeItem('loggedInUserName');
    // }
  }
}
