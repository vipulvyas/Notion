import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload2ArticleComponent } from './upload2-article.component';

describe('Upload2ArticleComponent', () => {
  let component: Upload2ArticleComponent;
  let fixture: ComponentFixture<Upload2ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload2ArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload2ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
