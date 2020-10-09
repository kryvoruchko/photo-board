import { Component, OnInit, Input } from '@angular/core';
import { IBoard } from '../../models/image-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board-gallery',
  templateUrl: './board-gallery.component.html',
  styleUrls: ['./board-gallery.component.scss'],
})
export class BoardGalleryComponent implements OnInit {
  @Input() board: IBoard;

  public imageUrl = environment.apiUrl;

  constructor() {}

  ngOnInit(): void {}
}
