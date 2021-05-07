import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';
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

      Swal.fire({
        title:'Thank you for banking with us...!',
        text: "Amount Deposited : " + this.account.depositAmount + "\n Available Balance : " + this.account.balance+ "\n Account Number : "+ this.account.number,
        icon: 'success'
      });
    },

      error => {
        console.log(error);
        Swal.fire("Error occured..! \n Try Again");

      })
  }
    ngOnInit(): void {
  }


}
