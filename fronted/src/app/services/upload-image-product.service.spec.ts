import { TestBed } from '@angular/core/testing';

import { UploadIMageProductService } from './upload-image-product.service';

describe('UploadIMageProductService', () => {
  let service: UploadIMageProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadIMageProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
