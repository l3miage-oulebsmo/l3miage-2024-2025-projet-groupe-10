import { TestBed } from '@angular/core/testing';

import { TourneeService } from './tournee.service';

describe('TourneeService', () => {
  let service: TourneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
