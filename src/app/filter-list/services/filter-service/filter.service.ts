import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../classes/character/character';
import { ApiService} from '../api-service/api.service';
import { SpeciesService} from '../species-service/species.service';
import { FilmService} from '../film-service/film.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters: any = {
    filmFilter: {
      status: false,
      parameter: null,
      options: [{name: 'All', value: null}],
      method: this.onFilmFilter
    },
    speciesFilter: {
      status: false,
      parameter: null,
      options: [{name: 'All', value: null}],
      method: this.onSpeciesFilter
    },
    ageFilterMin: {
      status: false,
      parameter: null,
      options: '',
      method: this.onAgeFilterMin.bind(this)
    },
    ageFilterMax: {
      status: false,
      parameter: null,
      options: '',
      method: this.onAgeFilterMax.bind(this)
    }
  };

  constructor(
    private apiService: ApiService,
    private speciesService: SpeciesService,
    private filmService: FilmService
  ) {
    this.getFilmOptions();
    this.getSpeciesOptions();
  }

  getFilters(): any {
    return this.filters;
  }

  getFilmOptions(): any {
    this.filmService.filmPipe.subscribe(species => {
      this.filters.filmFilter.options = [{name: 'All', value: null}].concat(species.map(film => {
        return {name: film.title, value: film.url};
      }));
    });
  }

  getSpeciesOptions(url= null): any {
    this.speciesService.speciesPipe.subscribe(species => {
      this.filters.speciesFilter.options = [{name: 'All', value: null}].concat(species.map(specie => {
        return {name: specie.name, value: specie.url};
      }));
    });
  }

  onFilmFilter(characters: Character[], filmUrl: string): Character[] {
    return characters.filter((character) => {
        if (character.films.includes(filmUrl)) {
          return character;
        }
    });
  }

  onSpeciesFilter(characters: Character[], speciesUrl: string): Character[] {
    return characters.filter((character) => {
      if (character.species.includes(speciesUrl)) {
        return character;
      }
    });
  }

  onAgeFilterMin(characters: Character[], paramter: any): Character[] {
    return characters.filter((character, index) => {
      if (character.birth_year !== 'unknown') {
        const age = this.getAgeAsFloat(character.birth_year);
        if (age >= paramter) {
          return character;
        }
      }
    });
  }

  onAgeFilterMax(characters: Character[], paramter: any): Character[] {
    return characters.filter((character, index) => {
      if (character.birth_year !== 'unknown') {
        const age = this.getAgeAsFloat(character.birth_year);
        if (age <= paramter) {
          return character;
        }
      }
    });
  }
  getAgeAsFloat(birthYear): number {
    const ageUnit = birthYear.substring(birthYear.length - 3, birthYear.length);
    const age = birthYear.substring(0, birthYear.length - 3);
    if (ageUnit === 'BBY') {
      return +Math.abs(age);
    }
    return age;
  }


}
