import { TestBed } from '@angular/core/testing';

import { AppDetailServiceService } from './app-detail-service.service';

describe('AppDetailServiceService', () => {
  let service: AppDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
