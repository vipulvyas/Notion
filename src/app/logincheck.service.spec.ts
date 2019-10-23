import { TestBed } from '@angular/core/testing';

import { LoginCheckService } from './logincheck.service';

describe('LogincheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCheckService = TestBed.get(LoginCheckService);
    expect(service).toBeTruthy();
  });
});
