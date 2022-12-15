import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { Library } from '../models/library';
import { User } from '../models/user';
import { UserRequest } from '../models/user.request';
import { BookService } from '../services/book.service';
import { BorrowingService } from '../services/borrowing.service';
import { LibraryService } from '../services/library.service';
import { UserRequestService } from '../services/user-request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient, private router: Router,
    private userRequestService: UserRequestService, private libraryService: LibraryService,
    private borrowingService: BorrowingService, private bookService: BookService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem('user'))
    this.action = 'addUser';
    this.userService.getAllUsers().subscribe((userList: User[]) => {
      this.users = userList;
    })
    this.updateInfo = "";
    this.userRequestService.getAllRequests().subscribe((reqList: UserRequest[]) => {
      this.userRequests = reqList;
    })
    this.libraryService.getData().subscribe((data: Library) => {
      this.generalData = data
    })
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
    })
    this.bookService.getId().subscribe((id: number) => {
      this.idBook = id + 1;
    })
  }

  admin: User;

  users: User[];
  books: Book[];
  userRequests: UserRequest[];

  generalData: Library;

  newUsername: string;
  newPassword: string;
  newFirstname: string;
  newLastname: string;
  newAddress: string;
  newMail: string;
  newPhone: string;
  newImage: string;
  newUserImg: File;
  action: string;
  errorFlag: boolean;
  infoMessage: string;

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newUserImg = file;
    }

    this.newImage = this.newUserImg.name;
    console.log(this.newUserImg.name);
  }

  register() {
    this.userService.register(this.newUsername, this.newPassword, this.newFirstname,
      this.newLastname, this.newAddress, this.newPhone, this.newMail, this.newImage).subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.errorFlag = false;
          this.infoMessage = "Uspešno ste registrovali korisnika!"
        } else {
          this.errorFlag = true;
          this.infoMessage = "Došlo je do greške prilikom registrovanja!"
        }
      })

    const formData = new FormData();
    formData.append('file', this.newUserImg);


    this.http.post<any>('http://localhost:4000/file', formData).subscribe((file: File) => {
      if (file != null) {
        console.log(file.name);
      }
      else {
        console.log('file error');
      }
    }
    );

    this.userService.getAllUsers().subscribe((userList: User[]) => {
      this.users = userList;
    })

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  updateInfo: string;
  edit: boolean;

  enableEdit() {
    this.edit = !this.edit;
    this.updateInfo = "";
    this.userService.getAllUsers().subscribe((userList: User[]) => {
      this.users = userList;
    })
  }

  editUser(user) {
    if (!this.edit) {
      this.updateInfo = "Editovanje nije omoguceno"
    }
    else {
      console.log(user.userType)
      this.userService.updateUser(user).subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.edit = false;
          this.userService.getAllUsers().subscribe((userList: User[]) => {
            this.users = userList;
          })
        } else {
          this.updateInfo = "Došlo je do greške prilikom izmena!"
        }
      })
    }
  }

  deleteUserMessage: string;

  delete(user) {
    this.borrowingService.getBorrowedBook(user.mail).subscribe((borrowings: Borrowing[]) => {
      if (borrowings.length == 0) {
        this.deleteUserMessage = ""
        this.userService.delete(user).subscribe(responseObj => {
          if (responseObj['message'] != 'correct') {
            console.log("greska")
          }
          else {
            this.userService.getAllUsers().subscribe((userList: User[]) => {
              this.users = userList;
            })
          }
        })
      }
      else
        this.deleteUserMessage = "Nije moguće obrisati korisnika koji ima pozajmljene knjige!"
    })
  }

  status: string;
  type: string;

  updateUser(user) {
    user.userType = this.type;
    user.status = this.status;
    this.userService.updateUser(user).subscribe(responseObj => {
      if (responseObj['message'] != 'correct') {
        console.log("greska")
      }
      else {
        this.userService.getAllUsers().subscribe((userList: User[]) => {
          this.users = userList;
        })
      }
    })
  }

  registerUser(user) {
    this.userService.register(user.username, user.password, user.name,
      user.lastname, user.address, user.phone, user.mail, user.img).subscribe(responseObj => {
        if (responseObj['message'] != 'correct') {
          console.log("greska u prihvatanju zahteva")
        }
        else {
          this.userService.getAllUsers().subscribe((userList: User[]) => {
            this.users = userList;
            this.deleteReq(user)
          })
        }
      })
  }

  deleteReq(req) {
    this.userRequestService.delete(req.id).subscribe(responseObj => {
      if (responseObj['message'] != 'correct') {
        console.log("greska")
      }
      else {
        this.userRequestService.getAllRequests().subscribe((reqList: UserRequest[]) => {
          this.userRequests = reqList;
        })
      }
    })
  }

  borrow: number;
  extend: number;

  setDays() {
    if (this.borrow != undefined) {
      this.libraryService.setBorrowTime(this.borrow).subscribe(responseObj => {
        if (responseObj['message'] != 'correct') {
          console.log("greska")
        }
      })
    }
    if (this.extend != undefined) {
      this.libraryService.setExtendTime(this.extend).subscribe(responseObj => {
        if (responseObj['message'] != 'correct') {
          console.log("greska")
        }
      })
    }
  }

  changePass() {
    this.router.navigate(['changePass']);
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

  insertBook() {
    if (this.imgReg == undefined)
      this.imgReg = 'nemaknjiga.png'
    this.bookService.insertBook(this.idBook, this.titleReg, this.genreReg, this.languageReg,
      this.publishReg, this.publisherReg, this.writersReg, this.captionReg, this.imgReg, this.numOfBooksReg,"").subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.errorFlag = false;
          this.messageReg = "Uspešno ste dodali knjige u sistem!"
          this.bookService.getId().subscribe((id: number) => {
            this.idBook = id + 1;
          })
          this.bookService.getAllBooks().subscribe((books: Book[]) => {
            this.books = books
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

  deleteBookMessage: string;

  deleteBook(bookId) {
    this.borrowingService.isBorrowedBoook(bookId).subscribe((borrowings: Borrowing[]) => {
      if (borrowings.length == 0) {
        this.deleteBookMessage = ""
        this.bookService.deleteBook(bookId).subscribe(res => {
          if (res['message'] == 'correct') {
            this.bookService.getAllBooks().subscribe((books: Book[]) => {
              this.books = books;
            })
            this.bookService.getId().subscribe((id: number) => {
              this.idBook = id + 1;
            })
          }
        })
      }
      else {
        this.deleteBookMessage = "Nije moguće obrisati knjigu koja ima pozajmljen primerak!"
      }
    })
  }

  editBook(book){
    sessionStorage.setItem('book',JSON.stringify(book))
    sessionStorage.setItem('user',JSON.stringify(this.admin))
    this.router.navigate(['book']);
  }

}



