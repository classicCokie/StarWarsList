import { Component, OnInit } from '@angular/core';
import { Character } from '../../classes/character/character';
import { CharacterService } from '../../services/character-service/character.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  characters: Character[] = [];
  isLoading: boolean = false;
  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characterService.getCharacters();
    this.listenOnCharacterChange();
  }

  listenOnCharacterChange(): void {
    this.characterService.characterPipe.subscribe(characters => {
      this.isLoading = false;
      this.characters = characters;
    });
  }

}
