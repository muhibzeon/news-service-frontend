import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeContentComponent } from './manage-home-content.component';

describe('ManageHomeContentComponent', () => {
  let component: ManageHomeContentComponent;
  let fixture: ComponentFixture<ManageHomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
