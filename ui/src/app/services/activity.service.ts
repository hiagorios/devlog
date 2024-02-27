import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  readonly endpoint = 'activities'

  constructor(private http: HttpClient) { }

  listActivities(description: string = '') {
    let headers = new HttpHeaders().append('description', description);

    return this.http.get<Activity[]>(
      `${environment.apiUrl}/${this.endpoint}`,
      { headers }
    );
  }

  saveActivity(description: string, minutesSpent: number) {
    const body = {
      description, minutesSpent
    };
    return this.http.post<Activity>(`${environment.apiUrl}/${this.endpoint}`, body);
  }
}
