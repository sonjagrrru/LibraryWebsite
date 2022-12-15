import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-unlogged',
  templateUrl: './unlogged.component.html',
  styleUrls: ['./unlogged.component.css']
})
export class UnloggedComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.searchMessage = ""
    this.bookService.bookOfDay().subscribe((book: Book) => {
      this.bookOfDay = book;
    })
  }
  
  searchTerm: string;
  searchedBooks: Book[];
  searchMessage: string;
  bookOfDay: Book;

  searchByParam() {
    this.searchTerm = this.searchTerm.toLowerCase()
    this.bookService.searchByParam(this.searchTerm).subscribe((bookList: Book[]) => {
      if (bookList != null && bookList.length != 0) {
        this.searchedBooks = bookList;
        this.searchMessage = ""
      }
      else {
        console.log('nema')
        this.searchMessage = "Nismo našli ni jednu knjigu sa zadatim parametrom"
      }
    })
  }

  home() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
