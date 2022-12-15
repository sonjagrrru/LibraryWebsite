import { HttpClient } from '@angular/common/http';
import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookReservation } from '../models/book.reservation';
import { Borrowing } from '../models/borrowing';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { BookReservationService } from '../services/book-reservation.service';
import { BookService } from '../services/book.service';
import { BorrowingService } from '../services/borrowing.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService,
    private http: HttpClient, private commentService: CommentService, private borrowingService: BorrowingService,
    private bookReservationService: BookReservationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.book = JSON.parse(sessionStorage.getItem('book'))
    this.borrowNum = JSON.parse(sessionStorage.getItem('borrowNum'))
    this.numOfAllBooks = this.book.numOfAllBooks
    this.commentService.getCommentsForBook(this.book.id).subscribe((comments: Comment[]) => {
      this.commments = comments;
      this.commments.sort(function (a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
    })
    this.borrowingService.getBorrowingByBookAndUser(this.user.mail, this.book.id).subscribe((indicator: Borrowing) => {
      if (indicator == undefined)
        this.canComment = false;
      else
        this.canComment = true;
    })
    this.returnError = JSON.parse(sessionStorage.getItem('returnError'))
    this.bookReservationService.isReserved(this.book.id, this.user.mail).subscribe((reservation: BookReservation) => {
      if (reservation == undefined) this.isReserved = false;
      else this.isReserved = true;
      console.log(this.isReserved)
    })
  }

  user: User;
  book: Book;
  edit: boolean;
  img: File;
  numOfAllBooks: number;
  commments: Comment[];
  canComment: boolean;
  comment: string;
  grade: number;
  borrowNum: number;
  returnError: boolean;
  isReserved: boolean;

  editBook() {
    this.edit = true;
  }

  home() {
    console.log(this.user.userType)
    if (this.user.userType == 'admin')
      this.router.navigate(['admin']);
    else
      this.router.navigate(['user']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  cancelEditBook() {
    this.edit = false;
    this.book = JSON.parse(sessionStorage.getItem('book'))
  }

  saveBook() {
    this.edit = false;
    if (this.numOfAllBooks < (this.book.numOfAllBooks - this.book.numOfFreeBooks)) {
      console.log('ne mozes za ovoliko da smanjis knjige')
    }
    else {
      if (this.numOfAllBooks > this.book.numOfAllBooks) {
        let date = new Date()
        this.bookReservationService.getData(this.book.id,
          this.numOfAllBooks - this.book.numOfAllBooks).subscribe((arr: BookReservation[]) => {
            for (let i = 0; i < arr.length; i++) {
              this.borrowingService.insertBorrowing(this.book.id, this.book.title, date.toISOString(),
                arr[i].mail, this.book.writers).subscribe(res => {
                  if (res['message'] == 'correct') {
                    window.location.reload()
                  }
                })
              this.bookReservationService.updateStatus(arr[i].bookId, arr[i].mail,
                arr[i].date, 'accepted').subscribe(res => {
                  window.location.reload()
                })
            }
            this.book.numOfFreeBooks -= (this.book.numOfAllBooks + arr.length - this.numOfAllBooks)
            this.book.numOfAllBooks = this.numOfAllBooks;
            this.bookService.updateBook(this.book.id, this.book.title, this.book.genre, this.book.language,
              this.book.publishYear, this.book.publisher, this.book.writers, this.book.caption, this.book.img,
              this.book.numOfAllBooks, this.book.numOfFreeBooks, this.book.bookOfDay).subscribe(responseObj => {
                if (responseObj['message'] == 'correct')
                  sessionStorage.setItem('book', JSON.stringify(this.book))
                this.numOfAllBooks = this.book.numOfAllBooks
                window.location.reload()
              })
          })
      }
      else {
        this.book.numOfFreeBooks -= (this.book.numOfAllBooks - this.numOfAllBooks)
        this.book.numOfAllBooks = this.numOfAllBooks;
        this.bookService.updateBook(this.book.id, this.book.title, this.book.genre, this.book.language,
          this.book.publishYear, this.book.publisher, this.book.writers, this.book.caption, this.book.img,
          this.book.numOfAllBooks, this.book.numOfFreeBooks, this.book.bookOfDay).subscribe(responseObj => {
            if (responseObj['message'] == 'correct')
              sessionStorage.setItem('book', JSON.stringify(this.book))
            this.numOfAllBooks = this.book.numOfAllBooks
          })
      }
      if (this.img != undefined) {
        const formData = new FormData();
        formData.append('file', this.img);


        this.http.post<any>('http://localhost:4000/file', formData).subscribe((file: File) => {
          if (file != null) {
            console.log(file.name);
          }
          else {
            console.log('file error');
          }
        }
        );
      }
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.img = file;
    }

    this.book.img = this.img.name;
    console.log(this.img.name);
  }

  getDate(date) {
    let tmp = new Date(date)
    return tmp.getDate() + '. ' + tmp.getMonth() + '. ' + tmp.getFullYear() + '.'
  }

  getTime(date) {
    let tmp = new Date(date)
    return tmp.getHours() + ":" + tmp.getMinutes()
  }

  setComment() {
    let date = new Date()
    this.commentService.setComment(this.comment, date.toISOString(), this.grade,
      this.book.id, this.user.mail, this.user.username).subscribe((res => {
        if (res['message'] == 'correct') {
          this.commentService.getCommentsForBook(this.book.id).subscribe((comments: Comment[]) => {
            this.commments = comments;
            this.commments.sort(function (a, b) {
              if (a.date < b.date) {
                return -1;
              }
              if (a.date > b.date) {
                return 1;
              }
              return 0;
            });
          })
        }
      }))
  }

  getStar(num) {
    switch (num) {
      case 1: return '★';
      case 2: return '★★';
      case 3: return '★★★';
      case 4: return '★★★★';
      case 5: return '★★★★★';
      case 6: return '★★★★★★';
      case 7: return '★★★★★★★';
      case 8: return '★★★★★★★★';
      case 9: return '★★★★★★★★★';
      default: return '★★★★★★★★★★';
    }
  }

  borrow() {
    let date = new Date();
    this.borrowingService.insertBorrowing(this.book.id, this.book.title, date.toISOString(),
      this.user.mail, this.book.writers).subscribe(res => {
        if (res['message'] == 'correct') {
          this.book.numOfFreeBooks = this.book.numOfFreeBooks - 1;
          this.borrowNum = this.borrowNum + 1;
          this.borrowingService.getBorrowingByBookAndUser(this.user.mail, this.book.id).subscribe((indicator: Borrowing) => {
            if (indicator == undefined)
              this.canComment = false;
            else
              this.canComment = true;
          })
          this.bookService.updateFreeBooks(this.book.id, this.book.numOfFreeBooks).subscribe(respon => {
            sessionStorage.setItem('book', JSON.stringify(this.book))
          })
        }
      })
  }

  reserve() {
    let date = new Date()
    this.bookReservationService.insertReservation(this.book.id, this.user.mail, date.toISOString(),
      this.book.title).subscribe(res => {
        if (res['message'] == 'correct') {
          window.location.reload()
        }
      })
  }
}
