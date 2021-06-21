import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  pomodoroTime = 1500;
  pomodoroBreak = 300;
  timer;
  working = true;
  buttonStatus = true;
  breakCount = 0;
  pomoCount = 0;

  constructor() {}

  start() {
    this.buttonStatus = false;
    if (this.working) {
      this.pomoCount++;
    } else {
      this.breakCount++;
    }
    this.timer = setInterval(() => {
      if (this.working) {
        this.pomodoroTime -= 1;
      } else {
        this.pomodoroBreak -= 1;
      }
      if (this.pomodoroTime === 0 || this.pomodoroBreak === 0) {
        this.stop();
        this.working = !this.working;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
    this.pomodoroTime = 1500;
    this.pomodoroBreak = 300;
    this.buttonStatus = true;
  }

  minutes() {
    if (this.working) {
      if (this.pomodoroTime / 60 < 10) {
        return of('0' + Math.floor(this.pomodoroTime / 60));
      } else {
        return of(Math.floor(this.pomodoroTime / 60));
      }
    } else {
      if (this.pomodoroBreak / 60 < 10) {
        return of('0' + Math.floor(this.pomodoroBreak / 60));
      } else {
        return of(Math.floor(this.pomodoroBreak / 60));
      }
    }
  }

  seconds() {
    if (this.working) {
      if (this.pomodoroTime % 60 < 10) {
        return of('0' + (this.pomodoroTime % 60));
      } else {
        return of(this.pomodoroTime % 60);
      }
    } else {
      if (this.pomodoroBreak % 60 < 10) {
        return of('0' + (this.pomodoroBreak % 60));
      } else {
        return of(this.pomodoroBreak % 60);
      }
    }
  }

  handleButton() {
    return of(this.buttonStatus);
  }

  countBreak() {
    return of(this.breakCount);
  }
  countPomo() {
    return of(this.pomoCount);
  }
}
