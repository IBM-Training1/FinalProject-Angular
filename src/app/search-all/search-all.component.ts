import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  accountArray: any;
  account:Account=new Account();

  constructor(private accountService: AccountService) { }

  searchByAccountNumber(number: any) {
    const observable = this.accountService.searchByNumber(number);
    observable.subscribe(response => {
      console.log(response);
      this.accountArray = [response];
      if (this.accountArray[0] == undefined) {
        alert("No Account found")

      } else {
        alert("Displaying..")
      }
    },
      error => {
        alert("Error Occured. Not able to search..");
      })

  }

  ngOnInit(): void {
    const observable = this.accountService.getAllAccounts();
    observable.subscribe(response => {
      console.log(response);
      this.accountArray = response;

    });
  }

}
