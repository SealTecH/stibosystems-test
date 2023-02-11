import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, take } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityType } from '../common/enums';
import { MockRouter } from '../common/test-utils';
import { mockUsers } from '../common/mocks';
import { ListPageComponent } from './list-page.component';
import { ListPageService } from './list-page.service';
import createSpy = jasmine.createSpy;

describe('ListPageComponent', () => {
   class MockActivatedRoute {
      snapshot = {
         data: {
            entityType: EntityType.Users
         }
      };
   }
   class MockListPageService {
      getDataByEntity = createSpy('getDataByEntity').and.returnValue(
         of(mockUsers)
      );

      loading$ = new BehaviorSubject<boolean>(false);
      intEntitiesList = createSpy('intEntitiesList');
   }

   let component: ListPageComponent;
   let fixture: ComponentFixture<ListPageComponent>;
   let router: MockRouter;
   let service: MockListPageService;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ListPageComponent, NoopAnimationsModule],
         providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute },
            { provide: ListPageService, useClass: MockListPageService },
            { provide: Router, useClass: MockRouter }
         ]
      }).compileComponents();

      fixture = TestBed.createComponent(ListPageComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router) as any;
      service = TestBed.inject(ListPageService) as any;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should show entities list', () => {
      component.filteredList$.pipe(take(1)).subscribe((list) => {
         expect(list).toEqual(mockUsers);
      });
   });

   it('should init service', () => {
      expect(service.intEntitiesList).toHaveBeenCalledOnceWith(EntityType.Users);
   });

   it('should filter entities list', () => {
      component.searchControl.setValue('anot');
      component.filteredList$.pipe(take(1)).subscribe((list) => {
         expect(list).toEqual([mockUsers[1]]);
      });
   });

   it('should navigate to child pages', () => {
      component.navigateToEntity(mockUsers[0]);
      expect(router.navigate).toHaveBeenCalledOnceWith([EntityType.Users, mockUsers[0].id], { state: { entity: mockUsers[0] } });
   });
});
