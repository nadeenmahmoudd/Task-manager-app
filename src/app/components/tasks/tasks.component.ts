import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private _taskService: TaskService) {}
  tasks: Task[] = [];
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10); // Get the userId from localStorage
  ngOnInit() {
    this.getTaskList();
  }
  // This commented  method also will not work because the data is static json

  // getTaskList():any{
  //   return this._taskService.getTasks().subscribe({
  //   next:(res)=>{
  //     console.log(res.filter((task: any) => task.userId === this.userId));
  //     // this.tasks=res
  //     this.tasks = res.filter((task: any) => task.userId === this.userId);
  //   },
  //   error:(err)=>{
  //     console.log(err);
  //   }
  //   })
  // }
  getTaskList(): void {
    // Try to get tasks from local storage first
    const localTasks = this._taskService.getTasksFromLocalStorage();

    if (localTasks.length > 0) {
      // If tasks are available in local storage, use them
      this.tasks = localTasks.filter(
        (task: any) => task.userId === this.userId
      );
    } else {
      // Otherwise, fetch from the JSON file
      this._taskService.getTasks().subscribe({
        next: (res) => {
          this.tasks = res.filter((task: Task) => task.userId === this.userId);
          this._taskService.saveTasksToLocalStorage(this.tasks); // Save to local storage
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  toggleTaskCompletion(task: Task): void {
    // Toggle the completed status
    task.completed = !task.completed;
    // Get tasks from local storage
    const tasks = this._taskService.getTasksFromLocalStorage();
    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    this._taskService.saveTasksToLocalStorage(updatedTasks);
  }
}

