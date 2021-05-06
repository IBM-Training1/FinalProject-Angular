import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  title: String = "Update Account Details";
  account: Account = new Account();
  accountArray: any;
  currentStatus: any;


  constructor(private accountService: AccountService) { }

  searchAccountByNumber(number: any) {

    let URL = 'http://localhost:8081/account/';
    let accountNumber = (<HTMLInputElement>document.getElementById('number')).value;
    if (accountNumber) {
      URL = URL + 'number/' + accountNumber;
      const observable = this.accountService.searchAccountByNumber1(accountNumber);
      observable.subscribe(response => {
        this.accountArray = response;
        this.currentStatus = this.accountArray.status;
        console.log("sucess");
        if (this.accountArray) {
          this.account = this.accountArray
        }
        else {
          alert("Enter a valid account number");
        }

      },
        (error: any) => {
          console.log(error);
          alert("error");
        }

      )

    }
    else {
      alert("Please enter account number");
    }

  }

  deposit() {
    const promise = this.accountService.updateAccount(this.account, this.account.id);
    promise.subscribe((response: any) => {
      console.log(response);

      this.account.balance+=this.account.depositAmount;
      this.accountArray[response];

      alert("Amount Deposited")
    },

      error => {
        console.log(error);
        alert("Failed!");

      })
  }

  ngOnInit(): void {
  }


}
