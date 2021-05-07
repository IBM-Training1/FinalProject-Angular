import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { Address } from '../Address';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account:Account = new Account();
  address:Address =new Address();
  accountArray:any;
  constructor(private accountservice: AccountService) { }
   save(){

    if (!this.account.firstName.trim()) {
      alert("Please provide First name");
    }
    else if (!this.account.lastName.trim()) {
      alert("Please provide Last Name");
    }

    else if (!this.account.address.city.trim()) {
      alert("Please provide City Name");
    }
    else if (!this.account.address.state.trim()) {
      alert("Please provide State");
    }
    else if (!this.account.address.pinCode.trim()) {
      alert("Please provide pincode");
    }
    else if (!this.account.balance) {
      alert("Please provide Balance");
    }
    else if (!this.account.number) {
      alert("Please provide Account Number");
    }
    else if (this.account.number.length<12 || this.account.number.length>17) {
      alert("Required lenth for Account Numbr should be between 12 to 17");
    }
    else {
      this.account.status = 'ACTIVE';

     const promise = this.accountservice.save(this.account);
      promise.subscribe(response =>{
          console.log(response);
          alert('Account Created..')
          this.accountArray.push(Object.assign({}, this.account));
        },
      error=> {
        console.log(error);
        alert('error hapenned..')
      })
    }
  }

  ngOnInit(): void {
  }

}
