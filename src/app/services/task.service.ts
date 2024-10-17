import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'assets/tasks.json';  
  private tasksSubject = new BehaviorSubject<Task[]>([]); // Holds the tasks
  tasks$ = this.tasksSubject.asObservable(); // Observable for tasks
  constructor(private _httpClient: HttpClient) { }

  // Load tasks from tasks.json and save to local storage
  loadTasksToLocalStorage() {
    this._httpClient.get<any[]>(this.tasksUrl).subscribe(tasks => {
      this.saveTasksToLocalStorage(tasks); // Save the tasks with all attributes
    });
  }

  getTasks(): Observable<any> {
    return this._httpClient.get(this.tasksUrl);
  }

  // Get tasks from local storage
  getTasksFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Save tasks to local storage
  saveTasksToLocalStorage(tasks: any[]): void {
    console.log("Saving tasks to local storage:", tasks); // Log to see what is being saved
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

