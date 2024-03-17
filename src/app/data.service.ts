import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private globalData = new BehaviorSubject({} as object);
  globalDataObser = this.globalData.asObservable();

  setGlobalData(param: object) {
    console.log('***abc', param);
    this.globalData.next(param);
  }

  getGlobalData(key: string) {
    this.globalDataObser.subscribe((data: any) => {
      console.log('### ', data, key);
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