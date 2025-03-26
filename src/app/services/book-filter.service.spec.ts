import { TestBed } from '@angular/core/testing';

import { BookFilterService } from './book-filter.service';

describe('BookFilterService', () => {
  let service: BookFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
