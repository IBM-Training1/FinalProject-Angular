import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './Account';
import { Address } from './Address';
const URL = 'http://localhost:8081/account/';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  searchAccountByNumber1(number: any) {
    return this.http.get(URL + '/number/' + number, {
      headers: {
        "content-type": 'application/json',
        reponseType: 'text'
      }
    });
  }



  updateAccount(Account: Account, id: any) {
    return this.http.put(URL + '/' + id, Account, {
      headers: { "content-type": 'application/json' }
    })
  }

  constructor(private http: HttpClient) { }
  save(account:Account) {
    return this.http.post(URL,account ,{
      headers: {"content-type": 'application/json' },
      responseType: "text"
    });
  }
  // searchAll(){
  //   return this.http.get(URL);
}
