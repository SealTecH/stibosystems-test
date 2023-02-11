import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { User } from '../common/interfaces';
import { mockUsers } from '../common/mocks';
import { UserPageComponent } from './user-page.component';
import createSpy = jasmine.createSpy;

describe('UserPageComponent', () => {
   class MockActivatedRoute {
      snapshot = {
         paramMap: new Map<string, string>().set('id', 'tes-id')
      };
   }

   class MockUserPageService extends EntityService<User> {
      loading$ = of(false);
      data$ = of(mockUsers[0]);
      getData = createSpy('getData');
      setData = createSpy('setData');
   }

   let component: UserPageComponent;
   let fixture: ComponentFixture<UserPageComponent>;
   let service: MockUserPageService;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [UserPageComponent, NoopAnimationsModule],
         providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute },
            { provide: EntityService, useClass: MockUserPageService }
         ]
      }).overrideComponent(UserPageComponent, {
         set: {
            providers: [
               { provide: EntityService, useClass: MockUserPageService }
            ]
         }
      });
      fixture = TestBed.createComponent(UserPageComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntityService) as any;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should call loading data if not passed by router', () => {
      expect(service.getData).toHaveBeenCalledOnceWith('tes-id');
   });
});
