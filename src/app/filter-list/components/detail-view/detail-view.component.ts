import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../classes/character/character';
import {CharacterService } from '../../services/character-service/character.service';
import {StarShipService } from '../../services/starship-service/star-ship.service';
import {FilmService } from '../../services/film-service/film.service';
import {SpeciesService } from '../../services/species-service/species.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  character: Character = new Character();

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private starShipService: StarShipService,
    private speciesService: SpeciesService,
    private filmService: FilmService
  ) { }

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacterById(parseInt(characterId, 10))
    .subscribe((character) => {
      this.character = character;
      this.getStarShipNames(this.character.starships);
      this.getFilmNames(this.character.films);
      this.getSpeciesNames(this.character.species);
    });
  }

  getFilmNames(films): void {
    combineLatest(films.map(filmUrl => this.filmService.getFilmNameByUrl(filmUrl)))
    .subscribe((films: string[]) => {
      this.character.films = films;
    });
  }

  getSpeciesNames(species): void {
    combineLatest(species.map(specieUrl => this.speciesService.getSpeciesByUrl(specieUrl)))
    .subscribe(species => {
      this.character.species = species;
    });
  }

  getStarShipNames(startShipUrls): void {
      // Make request for each starship Url
      combineLatest(startShipUrls.map(starshipUrl => this.starShipService.getStartShipNameByUrl(starshipUrl)))
      .subscribe((starships: string[]) => {
        this.character.starships = starships;
      });
  }

}
