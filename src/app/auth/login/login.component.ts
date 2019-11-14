import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,private uiService:UiService) { }
  isLoading = false;
  loggedIn:string;
  subscrptions:Subscription[]=[];

  ngOnInit() {
   this.subscrptions.push( this.uiService.loadingStateChanged.subscribe(loading=>{
      this.isLoading = loading;
    }));

   this.subscrptions.push( this.authService.authChange.subscribe(loggedIn=>{
      if(!loggedIn){
        this.loggedIn = "N";
        this.isLoading = false;
      }
    }));
  }

  ngOnDestroy(){
    if(this.subscrptions)
    this.subscrptions.forEach(x=>x.unsubscribe());
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.loggedIn = "";
    this.authService.loginUser({
      email: form.value.email,
      password: form.value.password
    })

  }
}
