import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor(private http: HttpClient) { }

  getBorrowedBook(usermail) {
    let data = {
      usermail: usermail
    }
    return this.http.post('http://localhost:4000/borrowings/getBorrowedBooks', data)
  }

  getAllUserBorrowedBooks(usermail) {
    let data = {
      usermail: usermail
    }
    return this.http.post('http://localhost:4000/borrowings/getAllUserBorrowedBooks', data)
  }

  isBorrowedBoook(idBook) {
    let data = {
      idBook: idBook
    }
    return this.http.post('http://localhost:4000/borrowings/isBorrowedBoook', data)
  }

  setReturning(idBook, mail,returnTime) {
    let data = {
      bookId: idBook,
      mail:mail,
      returnTime:returnTime
    }
    return this.http.post('http://localhost:4000/borrowings/setReturning', data)
  }

  setExtend(idBook, mail) {
    let data = {
      bookId: idBook,
      mail:mail
    }
    return this.http.post('http://localhost:4000/borrowings/setExtend', data)
  }

  insertBorrowing(bookId, bookName, dateOfBorrowing, userMail, writers) {
    let data = {
      bookId: bookId,
      bookName: bookName,
      dateOfBorrowing: dateOfBorrowing,
      userMail: userMail,
      writers: writers
    }
    return this.http.post('http://localhost:4000/borrowings/insertBorrowing', data)
  }

  getAllBorrowingRequests(usermail) {
    let data = {
      usermail: usermail
    }
    return this.http.post('http://localhost:4000/borrowings/getAllBorrowingRequests', data)
  }

  getBorrowingByBookAndUser(usermail, bookId) {
    let data = {
      usermail: usermail,
      bookId: bookId
    }
    return this.http.post('http://localhost:4000/borrowings/getBorrowingByBookAndUser', data)
  }
}
