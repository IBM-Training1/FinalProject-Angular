import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { Address } from '../Address';
import { AccountService } from '../account.service';
import swal from 'sweetalert2';



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
      swal.fire("Please provide First name");
    }
    else if (!this.account.lastName.trim()) {
      swal.fire("Please provide Last Name");
    }

    else if (!this.account.address.city.trim()) {
      swal.fire("Please provide City Name");
    }
    else if (!this.account.address.state.trim()) {
      swal.fire("Please provide State");
    }
    else if (!this.account.address.pinCode.trim()) {
      swal.fire("Please provide pincode");
    }
    else if (!this.account.balance) {
      swal.fire("Please provide Balance");
    }
    else if (!this.account.number) {
      swal.fire("Please provide Account Number");
    }
    else if (this.account.number.length<12 || this.account.number.length>17) {
      alert("Required lenth for Account Numbr should be between 12 to 17");
    }
    else {
      this.account.status = 'ACTIVE';

     const promise = this.accountservice.save(this.account);
      promise.subscribe(response =>{
          console.log(response);
          swal.fire('Account Created..')
          this.accountArray.push(Object.assign({}, this.account));
        },
      error=> {
        console.log(error);
        swal.fire('error hapenned..')
      })
    }
  }

  ngOnInit(): void {
  }

}
