import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService, HandleError } from '../error-handler-service/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    characterUrl = 'https://swapi.co/api/people/';
    filmUrl = 'https://swapi.co/api/films/';
    speciesUrl = 'https://swapi.co/api/species/';
    starShipUrl = 'https://swapi.co/api/starships/';
    handleError: HandleError;
    constructor(
        private http: HttpClient,
        errorHandler: ErrorHandlerService
    ) {
        this.handleError = errorHandler.createHandleError('HeroesService');
    }

    getCharacters(url): Observable<any> {
        url = (url === null) ? this.characterUrl : url;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError('getCharacters', []))
        );
    }

    getFilms(url): Observable<any> {
        url = (url === null) ? this.characterUrl : url;
        return this.http.get<any>(this.filmUrl).pipe(
          catchError(this.handleError('getFilms', []))
        );
    }

    getSpecies(url): Observable<any> {
        url = (url === null) ? this.speciesUrl : url;
        return this.http.get<any>(url).pipe(
          catchError(this.handleError('getSpecies', []))
        );
    }

    getStarship(url): Observable<any> {
        url = (url === null) ? this.starShipUrl : url;
        return this.http.get<any>(url).pipe(
          catchError(this.handleError('getSpaceships', []))
        );
      }

}
