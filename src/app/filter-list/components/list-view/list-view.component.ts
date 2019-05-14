import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Character } from '../../classes/character/character';
import { Filter } from '../../classes/filter/filter';
import { CharacterService } from '../../services/character-service/character.service';
import { FilterService } from '../../services/filter-service/filter.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  characters: Character[] = [];
  filters: Filter[];
  isLoading: boolean = true;
  filterForm = new FormGroup({
    filmFilter: new FormControl(null),
    speciesFilter: new FormControl(null),
    ageFilterMin: new FormControl(null),
    ageFilterMax: new FormControl(null)
  });
  constructor(
    private characterService: CharacterService,
    private filterService: FilterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.characterService.getCharacters();
    this.getFilters();
    this.listenOnFilterChange();
    this.listenOnCharacterChange();
  }

  getFilters(): void {
    this.filters = this.filterService.getFilters();
  }

  listenOnCharacterChange(): void {
    this.characterService.characterPipe.subscribe(characters => {
      this.isLoading = false;
      this.characters = characters;
    });
  }

  listenOnFilterChange() {
    this.filterForm.valueChanges.subscribe(changes => {
      this.filters = this.applyChangesToFilter(this.filters, changes);
      this.applyFilter();
    });
  }

  applyChangesToFilter(filters, changes) {
    return Object.keys(changes).reduce((result, key) => {
      // set if filter is active or not
      result[key].status = (changes[key] === null || changes[key].value === null) ? false : true;
      if (changes[key] === null) {
        return result;
      }
      // Change the parameter to the new filter setting
      result[key].parameter = changes[key].value || changes[key]; 
      return result;
    }, filters);
  }

  applyFilter(): void {
    this.characters = Object.keys(this.filters).reduce((result, key) => {
      if (this.filters[key].status) {
        result = this.filters[key].method(result, this.filters[key].parameter);
      }
      return result;
    }, JSON.parse(JSON.stringify(this.characterService.characters)));
  }

  onSelectCharacter(characterId) {
    this.router.navigate(['/characters', characterId]);;
  }

}
