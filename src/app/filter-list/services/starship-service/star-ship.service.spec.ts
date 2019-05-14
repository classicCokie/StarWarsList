import { TestBed } from '@angular/core/testing';

import { StarShipService } from './star-ship.service';

describe('StarShipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarShipService = TestBed.get(StarShipService);
    expect(service).toBeTruthy();
  });
});
