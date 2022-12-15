import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookRequestService {

  constructor(private http: HttpClient) { }

  insertRequest(idForm, titleForm,  genreForm, languageForm,
    publishYearForm, publisherForm, writersForm, captionForm, imgForm, usernameForm, numOfBooksForm) {
    const data = {
      id: idForm,
      title: titleForm,
      caption: captionForm,
      genre: genreForm,
      img: imgForm,
      language: languageForm,
      publisher: publisherForm,
      publishYear: publishYearForm,
      writers: writersForm,
      username: usernameForm,
      numOfBooks: numOfBooksForm
    }

    return this.http.post('http://localhost:4000/bookRequests/insert', data)

  }

  getId(){
    return this.http.get('http://localhost:4000/bookRequests/getId')
  }

  getAllRequests() {
    return this.http.get('http://localhost:4000/bookRequests/getAllRequests')
  }

  delete(idForm) {
    const data = {
      id: idForm
    }

    return this.http.post('http://localhost:4000/bookRequests/delete', data)
  }
}
