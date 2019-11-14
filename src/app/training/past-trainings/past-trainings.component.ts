import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit ,AfterViewInit, OnDestroy{
  displayedColumns =['date','name','calories','duration','state'];
  exercisesSubscription:Subscription;
  dataSource = new MatTableDataSource<Exercise>();
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private trainingService:TrainingService) {

  }

  ngOnInit() {
    this.trainingService.fetchPastExercises();
   this.exercisesSubscription = this.trainingService.passedExercisesChanged.subscribe((exercises)=>{
      this.dataSource.data = exercises
    })
  }

  ngOnDestroy(){
    this.exercisesSubscription.unsubscribe();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertTimestamp(date){
    return new Date(date.seconds*1000).toLocaleString();
  }

}
