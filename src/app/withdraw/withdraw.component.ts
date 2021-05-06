import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
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
        console.log("success");
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
        })
    }
    else {
      alert("Please enter account number");
    }
  }

  update() {

    if (this.account.balance >= this.account.withdrawAmount) {

      this.account.balance = this.account.balance - this.account.withdrawAmount;

      const promise = this.accountService.updateAccount(this.account, this.account.id);
      promise.subscribe((response: any) => {
        console.log(response);
        this.accountArray[response];

        alert("Amount Withdrawn")
      },
        error => {
          console.log(error);
          alert("Update not possible");
        })
    }
    else {
      alert("Enter an amount less than or equal to " + this.account.balance);
    }
  }

  ngOnInit(): void {
  }

}
