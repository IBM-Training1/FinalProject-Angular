import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './Account';
import { Address } from './Address';
const URL = 'http://localhost:8081/account/';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  save(account:Account) {
    return this.http.post(URL,account ,{
      headers: {"content-type": 'application/json' },
      responseType: "text"
    });
  }
  getAccountbyNumber(accountNumber:any){
    return this.http.get(URL+'number/'+ accountNumber, {
      headers: {
        "content-type": 'application/json',
        reponseType: 'text'
      }
      });
  }
  //ser
  // searchAll(){
  //   return this.http.get(URL);
}
