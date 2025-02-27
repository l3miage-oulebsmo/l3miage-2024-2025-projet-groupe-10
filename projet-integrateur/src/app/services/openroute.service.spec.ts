import { TestBed } from '@angular/core/testing';

import { OpenrouteService } from './openroute.service';

describe('OpenrouteService', () => {
  let service: OpenrouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenrouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
