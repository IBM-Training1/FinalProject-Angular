import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';

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

    if (confirm("Are u sure you want to withdraw Rs:" + this.account.withdrawAmount + "?")) {

      if (this.account.balance >= this.account.withdrawAmount) {

        this.account.balance = this.account.balance - this.account.withdrawAmount;


        const promise = this.accountService.updateAccount(this.account, this.account.id);
        promise.subscribe((response: any) => {
          console.log(response);
          this.accountArray[response];

          Swal.fire({
            title:'Thank you for banking with us...!',
            text: "Amount Withdrawn : " + this.account.withdrawAmount + "\n Available Balance : " + this.account.balance,
            icon: 'success'
          });
        },
          error => {
            console.log(error);
            Swal.fire("Error occured..! \n Try Again");
          })
      }
      else {
        Swal.fire({
          text: "Enter an amount less than or equal to " + this.account.balance,
          icon: 'warning'
        });
      }
    }
    else {
      Swal.fire({
        text: "Your transaction is Cancelled!!!",
        icon: 'error'
      });
    }
  }

  ngOnInit(): void {
  }

}
