import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http: HttpClient) { }

  insertRequest(idForm, usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm,
    phoneForm, mailForm, imgForm) {
    const data = {
      id: idForm,
      username: usernameForm,
      password: passwordForm,
      name: firstnameForm,
      lastname: lastnameForm,
      address: addressForm,
      phone: phoneForm,
      mail: mailForm,
      img: imgForm
    }

    return this.http.post('http://localhost:4000/requests/insert', data)

  }

  getAllRequests() {
    return this.http.get('http://localhost:4000/requests/getAllRequests')
  }

  delete(idForm) {
    const data = {
      id:idForm
    }
    return this.http.post('http://localhost:4000/requests/delete', data)
  }
}
