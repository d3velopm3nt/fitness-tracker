import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class TrainingService{
exerciseChanged = new Subject<Exercise>();
exercisesChanged = new Subject<Exercise[]>();
passedExercisesChanged = new  Subject<Exercise[]>();
private availableExercises: Exercise[];
private runningExecise: Exercise;
private fireSubscriptions:Subscription[]=[];

constructor(private db:AngularFirestore){

}

fetchAvailableExercises(){
   this.fireSubscriptions.push(this.db.collection("availableExercises")
  .snapshotChanges()
  .pipe(map(docArray=> {
   return docArray.map(doc=>{
     return{
       id: doc.payload.doc.id,
       name: doc.payload.doc.data()['name'],
       duration: doc.payload.doc.data()['duration'],
       calories: doc.payload.doc.data()['calories']
     };
   });
 })).subscribe((exercises:Exercise[]) =>{
  this.availableExercises = exercises;
  this.exercisesChanged.next(exercises);
 }))
}

startExercise(selectedId:string){
this.runningExecise = this.availableExercises.find(x=>x.id === selectedId);
this.exerciseChanged.next({...this.runningExecise});
}

private removeExercise(){
  this.runningExecise = null;
  this.exerciseChanged.next(null);
}

completeExercise(){
  this.addDataToFireBase({...this.runningExecise,date:new Date(),state:'completed'});
 this.removeExercise();
}

cancelExerecise(progress:number){
  this.addDataToFireBase({...this.runningExecise,
    date:new Date(),
    duration: this.runningExecise.duration *(progress /100),
    calories: this.runningExecise.duration *(progress /100),
    state:'cancelled'});
  this.removeExercise();
}

getRunnningExercise(){
  return {...this.runningExecise};
}

fetchPastExercises(){
 this.fireSubscriptions.push(this.db.collection('passedExercises').valueChanges().subscribe((exercises:Exercise[])=>{
    this.passedExercisesChanged.next(exercises);
  }));
}

private addDataToFireBase(exercise:Exercise){
this.db.collection('passedExercises').add(exercise);
}

cancelSubscriptions(){
  this.fireSubscriptions.forEach(x=>x.unsubscribe());
}
}
