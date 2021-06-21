import { TimeService } from './../../services/time.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  minutes;
  seconds;
  time;
  status;
  constructor(public timer: TimeService) {}

  ngOnInit(): void {
    this.minutes = Math.floor(this.timer.pomodoroTime / 60);
    this.seconds = this.timer.pomodoroTime % 60;
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
    clearInterval(this.time);
    this.minutes = 25;
    this.seconds = 0;
  }
}
