import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: any[] = [];
  filmPipe: EventEmitter<any> = new EventEmitter();
  constructor(
    private apiService: ApiService
  ) {
    this.getFilms();
   }

  getFilms(url= null) {
    this.apiService.getFilms(url).subscribe(films => {
      this.films = this.films.concat(films.results);
      this.filmPipe.emit(this.films);
      if (films.next !== null) {
        this.getFilms(films.next);
      }
    });
  }
}
