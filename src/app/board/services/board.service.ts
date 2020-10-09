import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard, IImageItems } from '../models/image-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.apiUrl}/api/boards/get-all`);
  }

  public getBoardsItems(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.apiUrl}/api/boards/${id}`);
  }

  public createBoard(name: string): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.apiUrl}/api/boards/create`, { name });
  }

  public addImage(id: string, data: File): Observable<IImageItems> {
    const formData = new FormData();
    formData.append('image', data);

    return this.http.post<IImageItems>(`${this.apiUrl}/api/boards/add-image/${id}`, formData);
  }

  public saveChanges(id: string): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.apiUrl}/api/boards/${id}/save`, null);
  }

  public dismissChanges(id: string): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.apiUrl}/api/boards/${id}/dismiss`, null);
  }
}
