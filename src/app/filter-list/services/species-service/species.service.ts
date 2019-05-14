import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  species: any[] = [];
  speciesPipe: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
  ) {
    this.getSpecies();
   }

  getSpecies(url= null) {
    this.apiService.getSpecies(url).subscribe(species => {
      this.species = this.species.concat(species.results);
      this.speciesPipe.emit(this.species);
      if (species.next !== null) {
        this.getSpecies(species.next);
      }
    });
  }

  getSpeciesByUrl(speciesUrl) {
    return new Observable(observable => {
      const specie = this.species.find(specie => {
        if (specie.url === speciesUrl) {
          return specie.name;
      }});

      if (specie === undefined) {
        this.apiService.getSpecie(speciesUrl).subscribe(specie => observable.next(specie));
      } else {
        observable.next(specie);
      }

    });
  }
}
