import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  setBorrowTime(borrow) {
    const data = {
      borrow:borrow
    }
    return this.http.post('http://localhost:4000/general/borrow', data)
  }

  setExtendTime(extend) {
    const data = {
      extend:extend
    }
    return this.http.post('http://localhost:4000/general/extend', data)
  }

  getData(){
    return this.http.get('http://localhost:4000/general/getData')
  }
}
