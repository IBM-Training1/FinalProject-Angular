import { Component, OnInit } from '@angular/core';
import { Account} from '../Account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  title :String ="Update Account Details";
  account:Account = new Account();
  accountArray:any;
  currentStatus:any;


  constructor(private accountService : AccountService) { }

  searchAccountByNumber(number:any){

    let URL='http://localhost:8081/account/';
    let accountNumber=(<HTMLInputElement>document.getElementById('number')).value;
    if(accountNumber){
      URL= URL + 'number/' +accountNumber;
      const observable = this.accountService.searchAccountByNumber1(accountNumber);
      observable.subscribe (response =>{
        this.accountArray= response;
        this.currentStatus=this.accountArray.status;
        console.log("sucess");
        if(this.accountArray){
          this.account=this.accountArray
        }
        else{
          alert("Enter a valid account number");
        }

      },
        (      error: any) =>{
        console.log(error);
        alert("error");
      }

        )

    }
    else{
      alert("Please enter account number");
    }

  }

  update(){
    const promise = this.accountService.updateAccount(this.account,this.account.id);
    promise.subscribe((response:any)=>{
      console.log(response);
      this.accountArray[response];

      alert("Account is Updated")
    },

    error => {
      console.log(error);
      alert("Update not possible");

    })
  }

  ngOnInit(): void {
  }

}
