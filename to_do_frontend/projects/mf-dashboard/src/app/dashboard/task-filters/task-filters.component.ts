import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * TaskFiltersComponent renders status/date/text filters.
 * Emits form value changes in future iterations to filter TaskList (scaffold only).
 */
@Component({
  selector: 'task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss'],
  standalone: false
})
export class TaskFiltersComponent {
  form = this.fb.group({
    text: [''],
    status: [''],
    dueFrom: [null as Date | null],
    dueTo: [null as Date | null]
  });

  constructor(private fb: FormBuilder) {}
}
