import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task-api.service';

export interface TaskDialogData {
  mode: 'create' | 'edit';
  task?: Task;
}

/**
 * PUBLIC_INTERFACE
 * TaskDialogComponent presents a form to create or edit a task.
 * Returns a Partial<Task> when the user saves.
 */
@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  standalone: false
})
export class TaskDialogComponent {
  titleText = this.data.mode === 'create' ? 'Add Task' : 'Edit Task';

  form = this.fb.group({
    title: [this.data.task?.title || '', [Validators.required]],
    description: [this.data.task?.description || ''],
    status: [this.data.task?.status || 'open', [Validators.required]],
    dueDate: [this.data.task?.dueDate ? new Date(this.data.task.dueDate) : null as Date | null],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent, Partial<Task> | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  // PUBLIC_INTERFACE
  /** Save dialog if valid */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const result: Partial<Task> = {
      title: v.title || '',
      description: v.description || '',
      status: (v.status as any) || 'open',
      dueDate: v.dueDate ? new Date(v.dueDate).toISOString() : undefined,
    };
    this.dialogRef.close(result);
  }

  // PUBLIC_INTERFACE
  /** Cancel dialog without saving */
  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
