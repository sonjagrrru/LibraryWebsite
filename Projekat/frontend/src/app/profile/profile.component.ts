import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.edit = false;
  }
  
  user:User;
  edit:boolean;

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  home() {
    this.router.navigate(['user']);
  }

  adminHome() {
    this.router.navigate(['admin']);
  }

  editUser(){
    this.edit = true;
  }

  cancelEditUser(){
    this.edit = false;
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  saveUser(){
    this.edit = false;
    this.userService.updateUser2(this.user).subscribe(responseObj => {
      if (responseObj['message'] != 'correct') {
        console.log("greska")
      }
      else {
        //console.log(this.user.mail)
        this.userService.getUser(this.user.mail).subscribe((user: User) => {
            this.user = user;
            sessionStorage.setItem('user',JSON.stringify(this.user))
        })
      }
    })
  }

}
