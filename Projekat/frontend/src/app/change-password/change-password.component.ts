import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  user: User;
  oldPassReg: string;
  newPassReg: string;
  newPass2Reg: string;

  home() {
    this.router.navigate(['user']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  changePass(){
    this.userService.changePassword(this.newPassReg, this.user.mail).subscribe(responseObj =>{
      if(responseObj['message']=='correct'){
        sessionStorage.clear();
        this.router.navigate(['']);
      }
      else{
        console.log(responseObj['message'])
      }
    })
  }
}
