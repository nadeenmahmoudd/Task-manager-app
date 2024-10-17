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
  // because the API is a static data the update will not work
  updateTask(id: number, task: any): Observable<any> {
    return this._httpClient.put<any>(`${this.tasksUrl}/${id}`, task);
  }
 // Get tasks from local storage
 getTasksFromLocalStorage(): any[] {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// Save tasks to local storage
saveTasksToLocalStorage(tasks: any[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

}
