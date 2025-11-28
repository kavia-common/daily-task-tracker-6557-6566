import { Component, signal } from '@angular/core';
import { Task } from '../task-api.service';

/**
 * PUBLIC_INTERFACE
 * DashboardShellComponent creates a responsive toolbar + sidenav layout and renders filters and the task list.
 */
@Component({
  selector: 'dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss'],
  standalone: false
})
export class DashboardShellComponent {
  drawerOpen = signal(true);
  // Placeholder selected task state to show how shell can react to child events.
  selectedTask = signal<Task | null>(null);

  // PUBLIC_INTERFACE
  /** Track selection changes from the task list */
  onTaskSelected(task: Task | null) {
    this.selectedTask.set(task);
  }
}
