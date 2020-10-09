import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from './services/board.service';
import { Subscription } from 'rxjs';
import { IBoard } from './models/image-item';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boardsList: IBoard[] = [];

  public board: IBoard;

  private snackBarConfig: MatSnackBarConfig = {
    duration: 1000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  }

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly boardService: BoardService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.boardService.getBoards().subscribe((data: IBoard[]) => {
        if (data && data.length > 0) {
          this.boardsList = data;
          this.getBoardById(data[0]._id);
        }
      })
    );
  }

  public create(name: string): void {
    this.subscriptions.add(
      this.boardService.createBoard(name).subscribe((res) => {
        this.boardsList.push(res);
        this.board = res;
        this.snackBar.open(`Board ${res.name} has been created!`, '', this.snackBarConfig);
      })
    );
  }

  public update(value: boolean): void {
    if (value) {
      this.subscriptions.add(
        this.boardService.saveChanges(this.board._id)
          .subscribe(board => {
            this.board = board;
            this.snackBar.open(`Changes have been saved!`, '', this.snackBarConfig);
          })
      );
    } else {
      this.subscriptions.add(
        this.boardService.dismissChanges(this.board._id)
          .subscribe(board => {
            this.board = board;
            this.snackBar.open(`Changes have been dismissed!`, '', this.snackBarConfig);
          })
      );
    }
  }

  public getBoardById(id: string): void {
    this.subscriptions.add(
      this.boardService.getBoardsItems(id).subscribe((board: IBoard) => {
        this.board = board;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
