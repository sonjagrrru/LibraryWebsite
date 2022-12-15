import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsForBook(id) {
    let data = {
      id: id
    }

    return this.http.post('http://localhost:4000/comment/getCommentsForBook', data)
  }

  setComment(comment, date, grade, idBook, mail, username) {
    let data = {
      comment: comment,
      date: date,
      grade: grade,
      idBook: idBook,
      mail: mail,
      username: username
    }

    return this.http.post('http://localhost:4000/comment/setComment', data)
  }
}
