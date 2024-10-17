import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard'; // Import the guard

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'signIn', component: SignInComponent },
  
  // Protect the tasks and task-details routes with the authGuard
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: 'task-details/:id', component: TaskDetailsComponent, canActivate: [authGuard] },
  
  // Wildcard route for a 404 page
  { path: '**', component: NotFoundComponent } // This will catch all unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
