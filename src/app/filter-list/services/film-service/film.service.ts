import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Observable } from 'rxjs';
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

  getFilmNameByUrl(filmUrl) {
    return new Observable(observable => {
      const film = this.films.find(film => {
        if (film.url === filmUrl) {
          return film.name;
      }});

      if (film === undefined) {
        this.apiService.getFilm(filmUrl).subscribe(film => observable.next(film));
      } else {
        observable.next(film);
      }


    });
  }
}
