import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { Address } from '../Address';
import { AccountService } from '../account.service';
import swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account: Account = new Account();
  address: Address = new Address();
  accountArray: any;
  constructor(private accountservice: AccountService) { }

  save() {

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
    else if (this.account.address.pinCode.length < 6 || this.account.address.pinCode.length > 6) {
      swal.fire("Required length for pin code should be 6");
    }
    else if (!this.account.balance) {
      swal.fire("Please provide Balance");
    }

    else {
      this.account.status = 'ACTIVE';
      this.generateUUID();

      const promise = this.accountservice.save(this.account);
      promise.subscribe(response => {
        console.log(response);
        swal.fire({
          title: 'Account Created',
          text: "Your account number is :" + this.account.number,
          icon: 'success'
        })
        this.accountArray.push(Object.assign({}, this.account));
      },
        error => {
          console.log(error);
          swal.fire('error hapenned..')
        })
    }
  }

  generateUUID() {
    const generatedUuid1 = uuidv4();
    const generatedUuid2 = uuidv4();
    const numericUuid1 = parseInt(generatedUuid1, 16);
    const numericUuid2 = parseInt(generatedUuid2, 16) / 100;
    const numericUuid3 = Math.round(numericUuid2)
    const stringUuid1 = numericUuid1.toString();
    const stringUuid2 = numericUuid3.toString();

    this.account.number = stringUuid1 + stringUuid2;
  }

  ngOnInit(): void {
  }

}
