import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../shared/ui.service';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  isAuhenticated: boolean;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService:UiService) {
  }

  initAuhListener() {
    this.fireAuth.authState.subscribe(user => {
      if(user){
        this.isAuhenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }
      else
      {
        this.trainingService.cancelSubscriptions();
        this.isAuhenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.fireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.showSnackBar('Register Successful','Ok',{duration:2000});
      }).catch(err => {
        this.uiService.showSnackBar(err.message,null,{duration:3000})
      });
  }

  isAuth() {
    return this.isAuhenticated;
  }

  loginUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.isAuhenticated = true;
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Login Successful','Ok',{duration:2000});

      }).catch(err => {
        this.isAuhenticated = false;
        this.uiService.loadingStateChanged.next(false);
        this.authChange.next(false);
        this.uiService.showSnackBar(err.message,null,{duration:3000})
      });

  }

  logoutUser() {
    this.fireAuth.auth.signOut();

  }


  getUser() {
    return { ...this.user };
  }
}
