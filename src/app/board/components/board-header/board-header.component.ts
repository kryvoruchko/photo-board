import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { BoardAddNewComponent } from '../board-add-new/board-add-new.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { IBoard } from '../../models/image-item';
import { BoardService } from '../../services/board.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  @Input() boards: string[] = [];

  @Input() board: IBoard;

  @Output() onCreateBoard: EventEmitter<string> = new EventEmitter();

  @Output() onSelectedBoard: EventEmitter<string> = new EventEmitter();

  public selectedItem: string;

  private snackBarConfig: MatSnackBarConfig = {
    duration: 1000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  }

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly boardService: BoardService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['board'] && changes['board'].currentValue) {
      this.board = changes['board'].currentValue;
      this.selectedItem = this.board._id;
    }
  }

  public addImage(fileInputEvent: any): void {
    if (fileInputEvent.target.files[0]) {
      this.subscriptions.add(
        this.boardService
          .addImage(this.board._id, fileInputEvent.target.files[0])
          .subscribe((image) => {
            this.board.images.push(image);
            this.board.isDraft = true;
            this.snackBar.open(`The image has been added!`, '', this.snackBarConfig);
          })
      );
    }
  }

  public openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardAddNewComponent, { minWidth: 500 });

    this.subscriptions.add(
      dialogRef.afterClosed()
        .subscribe((name: string) => {
          if (name) {
            this.onCreateBoard.emit(name);
          }
        })
    );
  }

  public selectBoard(event: MatSelectChange): void {
    this.onSelectedBoard.emit(event.value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
