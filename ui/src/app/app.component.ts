import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';
import { Activity } from './models/activity.model';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, FormatTimePipe],
  template: `
    <aside id="sidebar">
      <header>
        <h1>DevLog</h1>
      </header>
      <div id="calendar">TODO: activity calendar</div>
    </aside>
    <main id="content">
      <form id="activity-form">
        <label for="description-input">What are you working on?</label>
        <input
          id="description-input"
          type="text"
          [formControl]="description"
          placeholder="Start typing..."
        />
        <button type="button" (click)="onToggle()">
          {{isCounting() ? 'Stop' : 'Track'}}
        </button>
        <span id="time-spent" *ngIf="secondsSpent()">Elapsed: {{ secondsSpent() | formatTime }} </span>
      </form>
      <section id="activity-list">
        <h1>Activities</h1>
        <ul>
          <li *ngFor="let item of activityList">
            <small>{{ item.dateCreated | date:'shortTime' }} ({{item.minutesSpent * 60 | formatTime}})</small> {{ item.description }}
          </li>
        </ul>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  activityList: Activity[] = [];
  description = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  isCounting = signal(false);
  start?: Date;
  secondsSpent = signal(0);

  stopTimer$ = new Subject();

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.fetchActivities();
  }

  onToggle() {
    this.isCounting.update(prev => !prev);
    if (this.isCounting()) {
      this.start = new Date();
      this.startTimer();
    } else {
      const seconds = this.secondsSpent();
      this.stopTimer();

      const minutes = Math.floor(seconds / 60);
      if (10 > 0) {
        this.saveActivity(10);
      }
    }
  }

  saveActivity(minutes: number) {
    this.activityService.saveActivity(this.description.value as string, minutes).subscribe({
      next: () => {
        this.description.reset();
        this.fetchActivities();
      }
    })
  }

  fetchActivities() {
    this.activityService.listActivities().subscribe(res => {
      this.activityList = res;
    })
  }

  startTimer() {
    interval(1000)
      .pipe(takeUntil(this.stopTimer$))
      .subscribe(() => {
        if (this.isCounting()) {
          this.secondsSpent.set(this.calculateSecondsSpent());
        }
      })
  }

  stopTimer() {
    this.stopTimer$.next(true);
    this.start = undefined;
    this.secondsSpent.set(0);
  }

  calculateSecondsSpent(): number {
    if (!this.start) {
      return 0;
    }
    const now = new Date().getTime();
    const diff = now - this.start.getTime();
    return Math.floor(diff / 1000);
  }

  ngOnDestroy(): void {
    this.stopTimer$.next(true);
    this.stopTimer$.complete();
  }
}
