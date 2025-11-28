import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardShellComponent } from './shell/dashboard-shell.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFiltersComponent } from './task-filters/task-filters.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TASKS_API_BASE } from './task-api.service';

/**
 * PUBLIC_INTERFACE
 * DashboardModule exposed via Module Federation as './DashboardModule'.
 * Declares dashboard shell and task components and provides TASKS_API_BASE from window.NG_APP_API_BASE fallback.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: DashboardShellComponent }]),

    // Material
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatMenuModule,
  ],
  declarations: [
    DashboardShellComponent,
    TaskListComponent,
    TaskFiltersComponent,
    TaskDialogComponent
  ],
  exports: [DashboardShellComponent],
  providers: [
    {
      provide: TASKS_API_BASE,
      useFactory: () => {
        try {
          // eslint-disable-next-line no-undef
          const w = (globalThis as any)?.window as any | undefined;
          const fromWindow = (w && w.NG_APP_API_BASE) || '';
          return (typeof fromWindow === 'string' && fromWindow.length) ? fromWindow : 'http://localhost:3001';
        } catch {
          return 'http://localhost:3001';
        }
      }
    }
  ]
})
export class DashboardModule {}
