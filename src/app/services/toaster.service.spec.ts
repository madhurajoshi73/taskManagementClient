import { TestBed } from '@angular/core/testing';

import { ToasterUtilService } from './toasteUtilr.service';

describe('ToasterUtilService', () => {
  let service: ToasterUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
