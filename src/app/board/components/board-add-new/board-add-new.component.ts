import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-add-new',
  templateUrl: './board-add-new.component.html',
  styleUrls: ['./board-add-new.component.scss'],
})
export class BoardAddNewComponent implements OnInit {
  public createBoard: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BoardAddNewComponent>
  ) {
    this.createBoard = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public create(): void {
    this.dialogRef.close(this.createBoard.value.name);
  }
}
