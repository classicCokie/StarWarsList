import { Injectable, EventEmitter } from '@angular/core';
import { Character } from '../../classes/character/character';
import { ApiService } from '../../services/api-service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
    characters: Character[] = [];
    characterPipe: EventEmitter<Character[]> = new EventEmitter<Character[]>();

    constructor(
        private apiService: ApiService
    ) { }

    getCharacters(url: string= null): void {
        this.apiService.getCharacters(url).subscribe( characters => {
            this.characters = this.characters.concat(characters.results);

            this.characters = this.characters.map((character) => {
                character.characterId = this.extractCharacterIdFromUrl(character.url);
                return character;
            });

            if (characters.next !== null) {
                this.getCharacters(characters.next);
            } else {
                this.characterPipe.emit(this.characters);
            }
        }); 
    }

    getCharacterById(id: number): Observable<Character> {
        return new Observable(observable => {
          const character = this.characters.find(character => character.characterId === id);
          if (character !== undefined) {
            observable.next(character);
          } else {
            this.apiService.getCharacter(id).subscribe(character => observable.next(character));
          }
        });
      }

    extractCharacterIdFromUrl(url: string): number {
        const shortUrl = url.replace('https://swapi.co/api/people/', '');
        return parseInt(shortUrl.replace('/', ''), 10);
    }

}
