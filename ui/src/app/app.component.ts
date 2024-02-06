import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';
import { Activity } from './models/activity.model';
import { FormatTimePipe } from './pipes/format-time.pipe';

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
      <form id="activity-form" [formGroup]="activityForm">
        <label for="description-input">What are you working on?</label>
        <input
          id="description-input"
          type="text"
          formControlName="description"
          placeholder="Start typing..."
        />
        <button type="button" (click)="onToggle()">
          {{isCounting() ? 'Stop' : 'Track'}}
        </button>
        <span id="time-spent" *ngIf="secondsSpent()">{{ secondsSpent() | formatTime }} </span>
      </form>
      <section id="activity-list">
        <h1>Activities</h1>
        <ul>
          <li *ngFor="let item of activityList">
            {{ item.description }} - <span>{{ item.minutesSpent * 60 | formatTime }}</span>
          </li>
        </ul>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  activityList: Activity[] = [
    { id: 1, description: 'Actually work', minutesSpent: 35 },
    { id: 2, description: 'Make coffee', minutesSpent: 6.5 },
    { id: 3, description: 'Petting the cats', minutesSpent: 120 },
  ];
  activityForm!: FormGroup;

  isCounting = signal(false);
  start?: Date;
  secondsSpent = signal(0);

  stopTimer$ = new Subject();

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      id: [],
      description: ['', [Validators.required]],
      minutesSpent: [0]
    })
  }

  onToggle() {
    this.isCounting.update(prev => !prev);
    if (this.isCounting()) {
      this.start = new Date();
      this.startTimer();
    } else {
      this.stopTimer$.next(true);
      const seconds = this.secondsSpent();
      this.start = undefined;
      this.secondsSpent.set(0);

      this.activityForm.controls['minutesSpent'].setValue(seconds / 60);
      this.activityForm.controls['id'].setValue(this.activityList.length + 1);
      const activity: Activity = this.activityForm.value;
      this.activityList.push(activity);

      this.activityForm.reset();
    }
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
