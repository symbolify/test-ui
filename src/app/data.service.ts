import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private globalData = new BehaviorSubject({} as object);
  globalDataObser = this.globalData.asObservable();

  setGlobalData(param: object) {
    this.globalData.next(param);
  }

  getGlobalData(key: string) {
    this.globalDataObser.subscribe((data: any) => {
      for(let item in data) {
        console.log(item,key);
        if(item === key) {
          return data[item]
        }
      }
      return data;
    });
  }
}