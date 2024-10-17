import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task!: Task; 

  constructor(private _taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadTaskDetails();
    this._taskService.loadTasksToLocalStorage(); // Load tasks on initialization

  }

  loadTaskDetails() {
    const taskId = Number(this.route.snapshot.paramMap.get('id')); // Get the task ID from the route
    const tasks = this._taskService.getTasksFromLocalStorage(); // Get tasks from local storage
    this.task = tasks.find(t => t.id === taskId)!; // Find the task by ID
    console.log(this.task);
    
  }

  toggleTaskCompletion(task: any) {
    task.completed = !task.completed; // Toggle the completed status
    const tasks = this._taskService.getTasksFromLocalStorage(); // Retrieve current tasks
    const updatedTasks = tasks.map(t => (t.id === task.id ? task : t)); // Update the task in the array
    this._taskService.saveTasksToLocalStorage(updatedTasks); // Save updated tasks back to local storage
  }
}

