import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookRequest } from '../models/book.request';
import { BookReservation } from '../models/book.reservation';
import { Borrowing } from '../models/borrowing';
import { Library } from '../models/library';
import { User } from '../models/user';
import { BookRequestService } from '../services/book-request.service';
import { BookReservationService } from '../services/book-reservation.service';
import { BookService } from '../services/book.service';
import { BorrowingService } from '../services/borrowing.service';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService,
    private bookRequestService: BookRequestService, private http: HttpClient,
    private borrowingService: BorrowingService, private libraryService: LibraryService,
    private bookReservationService: BookReservationService) { 
    }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.searchMessage = ""
    if (this.user.userType == 'moderator') {
      this.bookRequestService.getAllRequests().subscribe((requests: BookRequest[]) => {
        this.bookRequests = requests;
        console.log(this.bookRequests.length)
      })
    }

    this.bookService.bookOfDay().subscribe((book: Book) => {
      this.bookOfDay = book;
    })
    this.bookRequestService.getId().subscribe((id: number) => {
      this.idReq = id + 1;
    })
    this.bookService.getId().subscribe((id: number) => {
      this.idBook = id + 1;
    })
    this.borrowingService.getBorrowedBook(this.user.mail).subscribe((borrowings: Borrowing[]) => {
      this.borrowings = borrowings;
      this.borrowedBooks = [];
      if (this.borrowings.length == 0) {
        this.hasBorrowedBook = false;
      }
      else {
        this.hasBorrowedBook = true;
        this.borrowings.forEach(borrowing => {
          this.bookService.getBookById(borrowing.bookId).subscribe((book: Book) => {
            this.borrowedBooks.push(book)
          })
        });
      }
    })
    this.libraryService.getData().subscribe((data: Library) => {
      this.generalData = data
    })
    this.messagesForBorrowings = [];
    this.returnError = false;
    this.bookService.getUsersBooks(this.user.username).subscribe((books: Book[]) => {
      this.suggestedBooks = books;
    })
    this.bookReservationService.getAccepttedReservations(this.user.mail).subscribe((reservations: BookReservation[]) => {
      this.acceptedRes = reservations
      console.log(this.acceptedRes.length)
    })
    
  }

  generalData: Library;
  user: User;
  searchTerm: string;
  searchedBooks: Book[];
  searchMessage: string;
  bookOfDay: Book;
  returnError: boolean;
  suggestedBooks: Book[];
  acceptedRes: BookReservation[];

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

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  bookPage(book) {
    sessionStorage.setItem('book', JSON.stringify(book))
    console.log(this.returnError)
    sessionStorage.setItem('returnError', JSON.stringify(this.returnError))
    sessionStorage.setItem('borrowNum', JSON.stringify(this.borrowings.length))
    this.router.navigate(['book']);
  }

  titleReg: string;
  genreReg: string;
  languageReg: string;
  publishReg: number;
  publisherReg: string;
  writersReg: string;
  captionReg: string;
  imgReg: string;
  imgFileReg: File;
  idReq: number;
  idBook: number;
  numOfBooksReg: number;
  messageReg: string;
  errorFlag: boolean;

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgFileReg = file;
    }

    this.imgReg = this.imgFileReg.name;
    console.log(this.imgFileReg.name);
  }

  insert() {
    if (this.imgReg == undefined)
      this.imgReg = 'nemaknjiga.png'
    this.bookRequestService.insertRequest(this.idReq, this.titleReg, this.genreReg, this.languageReg,
      this.publishReg, this.publisherReg, this.writersReg, this.captionReg, this.imgReg,
      this.user.username, this.numOfBooksReg).subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.errorFlag = false;
          this.messageReg = "Uspešno ste poslali zahtev!"
          this.bookRequestService.getId().subscribe((id: number) => {
            this.idReq = id + 1;
          })
        } else {
          this.errorFlag = true;
          this.messageReg = "Došlo je do greške prilikom slanja zahteva!"
        }
      })

    const formData = new FormData();
    formData.append('file', this.imgFileReg);


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

  insertBook() {
    if (this.imgReg == undefined)
      this.imgReg = 'nemaknjiga.png'
    this.bookService.insertBook(this.idBook, this.titleReg, this.genreReg, this.languageReg,
      this.publishReg, this.publisherReg, this.writersReg, this.captionReg, this.imgReg, this.numOfBooksReg, "").subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.errorFlag = false;
          this.messageReg = "Uspešno ste dodali knjige u sistem!"
          this.bookService.getId().subscribe((id: number) => {
            this.idBook = id + 1;
          })
        } else {
          this.errorFlag = true;
          this.messageReg = "Došlo je do greške prilikom slanja zahteva!"
        }
      })

    const formData = new FormData();
    formData.append('file', this.imgFileReg);


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

  changePass() {
    this.router.navigate(['changePass']);
  }

  borrowingHistory() {
    this.router.navigate(['borrowingHistory']);
  }

  bookRequests: BookRequest[];
  messageReq: string;

  registerBook(req) {
    this.bookService.insertBook(this.idBook, req.title, req.genre, req.language,
      req.publishYear, req.publisher, req.writers, req.caption, req.img, req.numOfBooks, req.username).subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.messageReq = "Uspešno ste dodali knjige u sistem!"
          this.bookService.getId().subscribe((id: number) => {
            this.idBook = id + 1;
          })
          this.deleteReq(req)
        } else {
          this.messageReq = "Došlo je do greške prilikom slanja zahteva!"
        }
      })
  }

  deleteReq(req) {
    this.bookRequestService.delete(req.id).subscribe(responseObj => {
      if (responseObj['message'] == 'correct') {
        this.messageReq = "Uspešno ste obrisali zahtev!"
        this.bookRequestService.getAllRequests().subscribe((requests: BookRequest[]) => {
          this.bookRequests = requests;
        })
      } else {
        this.messageReq = "Došlo je do greške prilikom brisanja zahteva!"
      }
    })
  }


  hasBorrowedBook: boolean;
  borrowings: Borrowing[];
  borrowedBooks: Book[];
  messagesForBorrowings: string[];
  getNumOfDays(book) {
    for (let i = 0; i < this.borrowings.length; i++) {
      if (this.borrowings[i].bookId == book.id) {
        let currentDate = new Date()
        let borrowDays = new Date(this.borrowings[i].dateOfBorrowing)
        let days = Math.floor((currentDate.getTime() - borrowDays.getTime()) / 1000 / 60 / 60 / 24);
        days = this.generalData.borrowTime - days
        if (this.borrowings[i].produzena == true) days += this.generalData.extendTime
        if (days < 0) {
          this.messagesForBorrowings[i] = "Vreme za vraćanje knjige " + book.title.toUpperCase() + " vam je isteklo!"
          this.returnError = true;
        }
        else if (days <= 2 && days >= 0) this.messagesForBorrowings[i] = "Vreme za vraćanje knjige " + book.title.toUpperCase() + " vam ističe kroz "
          + days +
          (days == 1 ? " dan" : " dana")
        return days;
      }
    }
    return 0;
  }

  isExtended(book) {
    for (let i = 0; i < this.borrowings.length; i++) {
      if (this.borrowings[i].bookId == book.id && this.borrowings[i].produzena) return true;
    }
    return false;
  }

  setExtend(book) {
    this.borrowingService.setExtend(book.id, this.user.mail).subscribe(res => {
      window.location.reload()
    })
  }

  //rezervacija
  returnBook(book) {
    let date = new Date()
    this.borrowingService.setReturning(book.id, this.user.mail, date.toISOString()).subscribe(res => {
      if (res['message'] == 'correct') {
        this.bookReservationService.getData(book.id, 1).subscribe((reservations: BookReservation) => {
          if (reservations == undefined) {
            let num = book.numOfFreeBooks + 1
            this.bookService.updateFreeBooks(book.id, num).subscribe(resp => {
              if (resp['message'] == 'correct') {
                window.location.reload()
              }
            })
          } else {
            this.borrowingService.insertBorrowing(book.id, book.title, date.toISOString(),
              reservations.mail, book.writers).subscribe(res => {
                if (res['message'] == 'correct') {
                  window.location.reload()
                }
              })
            this.bookReservationService.updateStatus(reservations.bookId, reservations.mail,
              reservations.date, 'accepted').subscribe(res => {
                window.location.reload()
              })
          }
        })

      }
    })
  }

  changeResStatus(res) {
    this.bookReservationService.updateStatus(res.bookId, res.mail, res.date, 'finished').subscribe(res => {
      if (res['message'] == 'correct')
        window.location.reload()
    })
  }

}
