import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
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
}
