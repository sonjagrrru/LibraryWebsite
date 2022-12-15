import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import { BookService } from '../services/book.service';
import { BorrowingService } from '../services/borrowing.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {

  constructor(private router: Router, private borrowingService: BorrowingService,
    private bookService:BookService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.borrowingService.getAllBorrowingRequests(this.user.mail).subscribe((borrowings: Borrowing[]) => {
      this.borrowings = borrowings;
      this.borrowings.sort(function (a, b) {
        if (a.dateOfReturn < b.dateOfReturn) {
          return -1;
        }
        if (a.dateOfReturn > b.dateOfReturn) {
          return 1;
        }
        return 0;
      });
    })
  }

  user: User;
  borrowings: Borrowing[];

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  home() {
    this.router.navigate(['user']);
  }

  returnDate(borrowing) {
    let ret = new Date(borrowing.dateOfReturn)
    if (ret.getFullYear() == 1970)
      return 'Još uvek nije vraćena'
    else
      return ret.getDay() + '. ' + ret.getMonth() + '. ' + ret.getFullYear() + '.'
  }

  borrowDate(borrowing) {
    let ret = new Date(borrowing.dateOfBorrowing)
    return ret.getDate() + '. ' + (ret.getMonth()+1) + '. ' + ret.getFullYear() + '.'
  }

  bookPage(id){
    this.bookService.getBookById(id).subscribe((book:Book)=>{
      if(book!=undefined){
        sessionStorage.setItem('book', JSON.stringify(book))
        this.router.navigate(['book']);
      }
    })
  }

  sortByTitle(){
    this.borrowings.sort(function (a, b) {
      if (a.bookName < b.bookName) {
        return -1;
      }
      if (a.bookName > b.bookName) {
        return 1;
      }
      return 0;
    });
  }

  sortByAutors(){
    this.borrowings.sort(function (a, b) {
      if (a.writers < b.writers) {
        return -1;
      }
      if (a.writers > b.writers) {
        return 1;
      }
      return 0;
    });
  }

  sortByReturnDate(){
    this.borrowings.sort(function (a, b) {
      if (a.dateOfReturn < b.dateOfReturn) {
        return -1;
      }
      if (a.dateOfReturn > b.dateOfReturn) {
        return 1;
      }
      return 0;
    });
  }

  sortByBorrowDate(){
    this.borrowings.sort(function (a, b) {
      if (a.dateOfBorrowing < b.dateOfBorrowing) {
        return -1;
      }
      if (a.dateOfBorrowing > b.dateOfBorrowing) {
        return 1;
      }
      return 0;
    });
  }
}
