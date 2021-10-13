import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitpandaComponent } from './bitpanda.component';

describe('BitpandaComponent', () => {
  let component: BitpandaComponent;
  let fixture: ComponentFixture<BitpandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitpandaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitpandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
