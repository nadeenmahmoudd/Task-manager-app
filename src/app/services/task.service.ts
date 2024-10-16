import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'assets/tasks.json';  
  tasks:any;
  constructor(private _httpClient :HttpClient) { }

  getTasks(): Observable<any> {
    return this._httpClient.get(this.tasksUrl);
  }

}
