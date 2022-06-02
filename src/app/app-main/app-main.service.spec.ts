import { TestBed } from '@angular/core/testing';

import { AppMainService } from './app-main.service';

describe('AppMainService', () => {
  let service: AppMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
