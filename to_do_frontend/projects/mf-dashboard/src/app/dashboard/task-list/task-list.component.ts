import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskApiService } from '../task-api.service';
import { TaskDialogComponent, TaskDialogData } from '../task-dialog/task-dialog.component';

/**
 * PUBLIC_INTERFACE
 * TaskListComponent renders a mat-table of tasks, supports add/edit/delete with optimistic UI.
 * Emits taskSelected when a row is highlighted.
 */
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  @Output() taskSelected = new EventEmitter<Task | null>();

  displayedColumns: string[] = ['title', 'status', 'dueDate', 'actions'];
  tasks = signal<Task[]>([]);
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  selectedId = signal<string | null>(null);

  constructor(
    private api: TaskApiService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // PUBLIC_INTERFACE
  /** Load tasks with loading banner and error handling */
  loadTasks(): void {
    this.loading.set(true);
    this.errorMsg.set(null);
    this.api.getTasks().subscribe({
      next: (items) => {
        this.loading.set(false);
        this.tasks.set(items);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.message || err?.message || 'Failed to load tasks.');
      }
    });
  }

  // PUBLIC_INTERFACE
  /** Open dialog to create a new task */
  addTask(): void {
    const ref = this.dialog.open<TaskDialogComponent, TaskDialogData, Partial<Task>>(TaskDialogComponent, {
      width: '420px',
      data: { mode: 'create' }
    });
    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      // optimistic prepend
      const tempId = 'tmp-' + Date.now();
      const optimistic: Task = {
        id: tempId,
        title: result.title || '',
        description: result.description,
        status: (result.status as any) || 'open',
        dueDate: result.dueDate,
      };
      const prev = this.tasks();
      this.tasks.set([optimistic, ...prev]);
      this.api.createTask(result).subscribe({
        next: (created) => {
          // replace temp with real
          this.tasks.set(this.tasks().map(t => t.id === tempId ? created : t));
          this.snack.open('Task created', 'OK', { duration: 2000 });
        },
        error: (err) => {
          // rollback
          this.tasks.set(prev);
          this.snack.open(err?.error?.message || 'Failed to create task', 'Dismiss', { duration: 3000 });
        }
      });
    });
  }

  // PUBLIC_INTERFACE
  /** Open dialog to edit task */
  editTask(task: Task): void {
    const ref = this.dialog.open<TaskDialogComponent, TaskDialogData, Partial<Task>>(TaskDialogComponent, {
      width: '420px',
      data: { mode: 'edit', task }
    });
    ref.afterClosed().subscribe((updates) => {
      if (!updates) return;
      const prev = this.tasks();
      const nextList = prev.map(t => t.id === task.id ? { ...t, ...updates } as Task : t);
      this.tasks.set(nextList);
      this.api.updateTask(task.id, updates).subscribe({
        next: (updated) => {
          this.tasks.set(this.tasks().map(t => t.id === task.id ? updated : t));
          this.snack.open('Task updated', 'OK', { duration: 2000 });
        },
        error: (err) => {
          this.tasks.set(prev);
          this.snack.open(err?.error?.message || 'Failed to update', 'Dismiss', { duration: 3000 });
        }
      });
    });
  }

  // PUBLIC_INTERFACE
  /** Delete task with optimistic removal */
  deleteTask(task: Task): void {
    const prev = this.tasks();
    this.tasks.set(prev.filter(t => t.id !== task.id));
    this.api.deleteTask(task.id).subscribe({
      next: () => this.snack.open('Task deleted', 'OK', { duration: 2000 }),
      error: (err) => {
        this.tasks.set(prev);
        this.snack.open(err?.error?.message || 'Failed to delete', 'Dismiss', { duration: 3000 });
      }
    });
  }

  // PUBLIC_INTERFACE
  /** Select a row */
  selectRow(task: Task): void {
    const next = this.selectedId() === task.id ? null : task.id;
    this.selectedId.set(next);
    this.taskSelected.emit(next ? task : null);
  }
}
