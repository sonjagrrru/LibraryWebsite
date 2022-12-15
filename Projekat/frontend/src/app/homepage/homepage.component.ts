import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user'
import { HttpClient } from '@angular/common/http';
import { UserRequestService } from '../services/user-request.service';
import { UserRequest } from '../models/user.request';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})



export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient,
    private userRequestService: UserRequestService, private bookService: BookService) { }

  ngOnInit(): void {
    this.hintMessage = "";
    this.userRequestService.getAllRequests().subscribe((reqList: UserRequest[]) => {
      if (reqList == null || reqList.length == 0)
        this.idReq = 0;
      else
        reqList.sort((a: UserRequest, b: UserRequest) => {
          return b.id - a.id;
        })
      this.idReq = reqList[0].id
    })
    this.bookService.getTopBooks().subscribe((books: Book[]) => {
      this.topBooks = books;
      console.log(this.topBooks.length)
    })
  }

  topBooks: Book[];
  idReq: number;
  pageEvent: PageEvent;

  password: string;
  username: string;
  hintMessage: string;

  login() {
    if (this.username == null) {
      this.hintMessage = "Korisničko ime je obavezno polje!"
    } else if (this.password == null) {
      this.hintMessage = "Šifra je obavezno polje!"
    }
    else {
      this.userService.login(this.username, this.password).subscribe((userFromDB: User) => {
        if (userFromDB != null) {
          if (userFromDB.userType == "admin") {
            sessionStorage.setItem('user', JSON.stringify(userFromDB))
            this.router.navigate(['admin'])
          } else {
            sessionStorage.setItem('user', JSON.stringify(userFromDB))
            this.router.navigate(['user'])
          }
        }
        else {
          this.hintMessage = "Ne postoji korisnik sa unetim korisničkim imenom ili šifrom!"
        }
      })
    }
  }

  usernameReg: string;
  passwordReg: string;
  passwordSubmitReg: string;
  firstnameReg: string;
  lastnameReg: string;
  addressReg: string;
  phoneReg: string;
  mailReg: string;
  imgFileReg: File;
  imgReg: string;
  messageReg: string;
  errorFlag: boolean;

  register() {
    this.idReq++;
    if (this.imgReg == undefined)
      this.imgReg = 'nema.png'
    this.userRequestService.insertRequest(this.idReq, this.usernameReg, this.passwordReg, this.firstnameReg,
      this.lastnameReg, this.addressReg, this.phoneReg, this.mailReg, this.imgReg).subscribe(responseObj => {
        if (responseObj['message'] == 'correct') {
          this.errorFlag = false;
          this.messageReg = "Uspešno ste se registrovali!"
        } else if (responseObj['message'] == 'error') {
          this.errorFlag = true;
          this.messageReg = "Došlo je do greške prilikom registrovanja!"
        }
        else{
          this.errorFlag = true;
          this.messageReg = "Nalog sa zadatim mejlom vec postoji!"
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

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgFileReg = file;
    }

    this.imgReg = this.imgFileReg.name;
    console.log(this.imgFileReg.name);
  }

  unlogged(){
    this.router.navigate(['unlogged'])
  }

}
