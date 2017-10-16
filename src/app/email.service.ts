

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/empty';

@Injectable()
export class EmailService {

  private baseUrl = 'https://api.mailgun.net/v3/sandboxffc9f38630034f7b99b68d6f6f5fc14f.mailgun.org/messages'

  constructor(private http: Http) { }


  convertToForm(s) {
    return encodeURIComponent(s).replace(/%20/, '+');
  }

  sendEmail2() {

    let api_key = 'cb0bbb38d43e16b4cdc79281a843d712'
    let DOMAIN = 'Mailgun Sandbox <postmaster@sandboxffc9f38630034f7b99b68d6f6f5fc14f.mailgun.org>'
    let apiUrl = `https://api.mailgun.net/v3/sandboxffc9f38630034f7b99b68d6f6f5fc14f.mailgun.org/messages`;

    var data = {
      from: 'Mailgun Sandbox <postmaster@sandboxffc9f38630034f7b99b68d6f6f5fc14f.mailgun.org>',
      to: 'ruben <groceryruben@gmail.com>',
      subject: 'From Browser - grocery',
      text: 'Testing some Mailgun awesomness!'
    };

    const payload = `from=${this.convertToForm(data.from)}&to=${this.convertToForm(data.to)}&subject=${this.convertToForm(data.subject)}&text=${this.convertToForm(data.text)}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', `api:${api_key}`);

    const options: RequestOptionsArgs = {
      headers: headers,
    }

    this.http
      .post(apiUrl, payload, { headers })
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      );

  }







}