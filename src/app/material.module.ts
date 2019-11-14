import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
MatCheckboxModule,
MatSidenavModule,
MatToolbarModule,
MatListModule,
MatTabsModule,
MatCardModule,
MatSelectModule,
MatProgressSpinnerModule,
MatDialogModule,
MatTableModule,
MatSortModule,
MatPaginatorModule,
MatSnackBarModule
} from '@angular/material';

import {FormsModule} from '@angular/forms';

const modules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
MatDatepickerModule,
MatNativeDateModule,
MatCheckboxModule,
MatSidenavModule,
MatToolbarModule,
MatListModule,
MatTabsModule,
MatCardModule,
MatSelectModule,
MatProgressSpinnerModule,
MatDialogModule,
MatTableModule,
MatSortModule,
MatPaginatorModule,
MatSnackBarModule
];

@NgModule({
  imports:modules,
  exports:modules
})
export class MaterialModule{}
