import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyService } from '../myservice';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { idVerification } from './verification';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  selectedFile = null;
  state: number = 2;
  verificationCollection: AngularFirestoreCollection<idVerification>;
  idVerification: idVerification;
  ipAddress: string = null;
  image: any = "assets/img/IDCard.png";
  selectedImage: any = null;



  constructor(private http: HttpClient, db: AngularFirestore) { 
    this.verificationCollection=db.collection('idVerification');
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
      this.ipAddress = data.ip
    })
  }

  ngOnInit() {
  }


  onFileSelected(event){    
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.image = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else{
      this.image = "assets/img/IDCard.png";
      this.selectedImage = null;
    }
    this.selectedFile = event.target.files[0];
    console.log("selected File Name: ", this.selectedFile.name);
    const metaData = {'contentType': this.selectedFile.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`${this.ipAddress}`);
    storageRef.put(this.selectedFile, metaData)
    setTimeout(function(){
      console.log("Uploading..", this.selectedFile.name);
    },3000);
    
    this.image = `https://firebasestorage.googleapis.com/v0/b/netfx-86b11.appspot.com/o/${this.ipAddress}?alt=media`;
    
    // this.verificationCollection.add({...this.selectedFile});
  }

  onUpload(){

  }

  togglePassport(){
    this.state = 1;
  }
  toggleID(){
    this.state = 2;
  }
  toggleBack(){
    this.state = 0;
  }
  toggleIdBack(){
    this.state = 3;
  }
}
