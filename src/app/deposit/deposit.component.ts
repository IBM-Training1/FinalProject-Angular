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
   accountResult:any;

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
    var a:number=+this.account.balance
      var b:number=+this.account.depositAmount
      a+=b;
      this.accountArray.balance=a;
      // this.account=this.accountArray;

    const promise = this.accountService.updateAccount(this.account, this.account.id);
    promise.subscribe((response: any) => {
      console.log(response);

      this.accountArray[response];

      alert("Amount Deposited")
      this.getAccountbyNumber(this.account.number)
    },

      error => {
        console.log(error);
        alert("Failed!");

      })
  }
  getAccountbyNumber(number:any)
  {
    const accountNumber =number;
      if(accountNumber!=null){
        const promise = this.accountService.getAccountbyNumber(accountNumber);
      promise.subscribe(response=> {
        this.accountResult = [response];
        if (this.accountResult!=0) {
          this.accountArray = this.accountResult;
          console.log(response);

        }
        else {
          alert("Date not found for account number:  "+number);
        }
      },
        error => {
          console.log(error);
          alert('error happened..')
        });
      }


  }
  ngOnInit(): void {
  }


}
