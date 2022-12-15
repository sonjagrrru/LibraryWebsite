import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLine } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usernameForm, passwordForm) {
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post('http://localhost:4000/users/login', data)
  }

  register(usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm,
    phoneForm, mailForm, imgForm) {
    const data = {
      username: usernameForm,
      password: passwordForm,
      name: firstnameForm,
      lastname: lastnameForm,
      address: addressForm,
      phone: phoneForm,
      mail: mailForm,
      img: imgForm
    }

    return this.http.post('http://localhost:4000/users/register', data)

  }

  getAllUsers() {
    return this.http.get('http://localhost:4000/users/getAllUsers')
  }

  updateUser(user) {
    const data = {
      userType: user.userType,
      username: user.username,
      password: user.password,
      name: user.name,
      lastname: user.lastname,
      address: user.address,
      phone: user.phone,
      mail: user.mail,
      status: user.status
    }
    return this.http.post('http://localhost:4000/users/updateUser', data)
  }

  updateUser2(user) {
    const data = {
      username: user.username,
      password: user.password,
      name: user.name,
      lastname: user.lastname,
      address: user.address,
      phone: user.phone,
      mail: user.mail
    }
    return this.http.post('http://localhost:4000/users/updateUser2', data)
  }

  delete(user) {
    const data = {
      mail: user.mail
    }

    return this.http.post('http://localhost:4000/users/deleteUser', data)

  }

  getUser(mail) {
    const data = {
      mail: mail
    }

    return this.http.post('http://localhost:4000/users/getUser', data)
  }

  changePassword(password, mail) {
    const data = {
      password: password,
      mail: mail
    }

    return this.http.post('http://localhost:4000/users/changePassword', data)
  }
}
