import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

const progressMesssages =new Map<number,string>();
progressMesssages.set(1, "Lets get going");
progressMesssages.set(25, "Keep on going, you can do it!");
progressMesssages.set(50,"Half Way, carry on!");
progressMesssages.set(75, "Almost done, you can do it!");
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  progressMessage:string;
  exercise:string
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
    this.exercise = this.trainingService.getRunnningExercise().name;
    }

  startOrResumeTimer() {
    const step = this.trainingService.getRunnningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if(progressMesssages.has(this.progress))
      this.progressMessage = progressMesssages.get(this.progress);
      if (this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent,
      {
        data:
          {
            progress: this.progress
          }
      }).afterClosed().subscribe(result => {
        if (result)
          this.trainingService.cancelExerecise(this.progress);
        else
          this.startOrResumeTimer();
      })
  }



}
