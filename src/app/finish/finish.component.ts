import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  finished:boolean=false;

  constructor(private router:Router) {
   }

  ngOnInit() {
    this.delay(5000);
    

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));  
    this.finished=true;
    this.delayAndRedirect(3000);
}

async delayAndRedirect(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));  
  window.location.href = 'https://netflix.com';
}

}
