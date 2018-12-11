import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeComponent } from './genome.component';

describe('GenomeComponent', () => {
  let component: GenomeComponent;
  let fixture: ComponentFixture<GenomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
