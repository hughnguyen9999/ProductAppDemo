import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ShareDataService {

  count: number = 0;

  setData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  getData(name: string) {
    let data = localStorage.getItem(name);
    return JSON.parse(data);
  }

  clearData(name: string) {
    localStorage.removeItem(name);
  }

  cleanAll() {
    localStorage.clear()
  }

}
