import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService{

  loadingStateChanged = new Subject<boolean>();

constructor(private snackbar:MatSnackBar){

}
  showSnackBar(messsage,action,duration){
    this.snackbar.open(messsage,action,duration);
  }
}
