import { TestBed } from '@angular/core/testing';

import { ColonizationService } from './colonization.service';

describe('ColonizationService', () => {
  let service: ColonizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColonizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
