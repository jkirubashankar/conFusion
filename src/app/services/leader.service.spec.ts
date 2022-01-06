import { TestBed } from '@angular/core/testing';

import { LeadershipService } from './leader.service';

describe('LeadershipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadershipService = TestBed.get(LeadershipService);
    expect(service).toBeTruthy();
  });
});
