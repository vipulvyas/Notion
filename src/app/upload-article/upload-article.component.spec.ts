import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArticleComponent } from './upload-article.component';

describe('UploadArticleComponent', () => {
  let component: UploadArticleComponent;
  let fixture: ComponentFixture<UploadArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
