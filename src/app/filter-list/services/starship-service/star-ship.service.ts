import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarShipService {
  spaceShips: any[] = [];
  spaceShipPipe: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private apiService: ApiService
  ) {
    this.getSpaceships();
  }

  getSpaceships(url= null) {
    this.apiService.getStarships(url).subscribe(spaceShips => {
      this.spaceShips = this.spaceShips.concat(spaceShips.results);
      this.spaceShipPipe.emit(this.spaceShips);
      if (spaceShips.next !== null) {
        this.getSpaceships(spaceShips.next);
      }
    });
  }

  getStartShipNameByUrl(starshipUrl) {
    return new Observable(observable => {
      const starship = this.spaceShips.find(starship => {
        if (starship.url === starshipUrl) {
          return starship.name;
      }});

      if (starship === undefined) {
        this.apiService.getStarship(starshipUrl).subscribe(starship => observable.next(starship));
      } else {
        observable.next(starship);
      }
    });
  }
}
