import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
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
        <button type="button">
          Track
        </button>
        <span *ngIf="activityForm.controls['minutesSpent'].value > 0">{{ activityForm.controls['minutesSpent'].value }} min </span>
      </form>
      <section id="activity-list">
        <h1>Activities</h1>
        <ul>
          <li>Actually work</li>
          <li>Make coffee</li>
          <li>Petting the cats</li>
        </ul>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  activityForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      id: [],
      description: ['', [Validators.required]],
      minutesSpent: [0]
    })
  }
}
