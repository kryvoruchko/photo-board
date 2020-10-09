import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { BoardGalleryComponent } from './components/board-gallery/board-gallery.component';

import { BoardService } from './services/board.service';
import { BoardAddNewComponent } from './components/board-add-new/board-add-new.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardGalleryComponent,
    BoardAddNewComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    BoardRoutingModule,
  ],
  providers: [BoardService],
})
export class BoardModule {}
