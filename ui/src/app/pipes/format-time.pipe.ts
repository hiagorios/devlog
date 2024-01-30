import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(seconds: number): string {
    const extraSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const extraMinutes = Math.floor(minutes % 60);
    const hours = Math.floor(minutes / 60);

    let displayText = '';
    if (hours) {
      displayText += `${hours}h `;
    }
    if (extraMinutes) {
      displayText += `${extraMinutes}m `;
    }
    if (extraSeconds) {
      displayText += `${extraSeconds}s`;
    }
    return displayText.trim();
  }

}
