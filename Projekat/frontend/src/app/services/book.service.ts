import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  searchByParam(param) {
    let data = {
      param: param
    }
    return this.http.post('http://localhost:4000/books/getBooksByParams', data)
  }

  getBookById(id) {
    let data = {
      id: id
    }
    return this.http.post('http://localhost:4000/books/getBookById', data)
  }

  bookOfDay() {
    return this.http.get('http://localhost:4000/books/bookOfDay')
  }

  getTopBooks() {
    return this.http.get('http://localhost:4000/books/getTopBooks')
  }

  getAllBooks() {
    return this.http.get('http://localhost:4000/books/getAllBooks')
  }

  getUsersBooks(username) {
    let data = {
      username: username
    }

    return this.http.post('http://localhost:4000/books/getUsersBooks', data)
  }


  deleteBook(id) {
    let data = {
      id: id
    }
    return this.http.post('http://localhost:4000/books/deleteBook', data)
  }


  insertBook(idReq, titleReg, genreReg, languageReg,
    publishReg, publisherReg, writersReg, captionReg, imgReg, allBooksReg, username) {

    let data = {
      id: idReq,
      title: titleReg,
      genre: genreReg,
      language: languageReg,
      publish: publishReg,
      publisher: publisherReg,
      writers: writersReg,
      caption: captionReg,
      numOfAllBooks: allBooksReg,
      img: imgReg,
      username: username
    }

    return this.http.post('http://localhost:4000/books/insert', data)
  }

  updateBook(idReq, titleReg, genreReg, languageReg,
    publishReg, publisherReg, writersReg, captionReg, imgReg, allBooksReg, freeBooksReg, bookOfDay) {

    let data = {
      id: idReq,
      title: titleReg,
      genre: genreReg,
      language: languageReg,
      publish: publishReg,
      publisher: publisherReg,
      writers: writersReg,
      caption: captionReg,
      img: imgReg,
      numOfAllBooks: allBooksReg,
      numOfFreeBooks: freeBooksReg,
      bookOfDay: bookOfDay
    }

    return this.http.post('http://localhost:4000/books/update', data)
  }

  updateFreeBooks(idReq, freeBooksReg) {

    let data = {
      id: idReq,
      numOfFreeBooks: freeBooksReg
    }

    return this.http.post('http://localhost:4000/books/updateFreeBooks', data)
  }

  getId() {
    return this.http.get('http://localhost:4000/books/getId')
  }
}
