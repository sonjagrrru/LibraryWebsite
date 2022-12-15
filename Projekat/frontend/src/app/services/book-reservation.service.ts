import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookReservationService {

  constructor(private http: HttpClient) { }

  insertReservation(bookId, mail, date, title) {

    let data = {
      bookId: bookId,
      mail: mail,
      date: date,
      title: title
    }

    return this.http.post('http://localhost:4000/bookReservation/insertReservation', data)
  }

  getData(bookId, number) {

    let data = {
      bookId: bookId,
      number: number
    }

    return this.http.post('http://localhost:4000/bookReservation/getData', data)
  }

  updateStatus(bookId, mail, date, status) {

    let data = {
      bookId: bookId,
      mail: mail,
      date: date,
      status: status
    }

    return this.http.post('http://localhost:4000/bookReservation/updateStatus', data)
  }

  isReserved(bookId, mail) {

    let data = {
      bookId: bookId,
      mail: mail
    }

    return this.http.post('http://localhost:4000/bookReservation/isReserved', data)
  }

  getAccepttedReservations(mail) {

    let data = {
      mail: mail
    }

    return this.http.post('http://localhost:4000/bookReservation/getAccepttedReservations', data)
  }
}
