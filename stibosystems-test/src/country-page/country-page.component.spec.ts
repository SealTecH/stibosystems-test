import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { Country } from '../common/interfaces';
import { mockCountries } from '../common/mocks';
import { CountryPageComponent } from './country-page.component';
import createSpy = jasmine.createSpy;

describe('CountryPageComponent', () => {
   let component: CountryPageComponent;
   let fixture: ComponentFixture<CountryPageComponent>;

   class MockActivatedRoute {
      snapshot = {
         paramMap: new Map<string, string>().set('id', 'tes-id')
      };
   }
   class MockCountryPageService extends EntityService<Country> {
      loading$ = of(false);
      data$ = of(mockCountries[0]);
      getData = createSpy('getData');
      setData = createSpy('setData');
   }

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [CountryPageComponent, NoopAnimationsModule],
         providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute },
            { provide: EntityService, useClass: MockCountryPageService }
         ]
      }).overrideComponent(CountryPageComponent, {
         set: {
            providers: [
               { provide: EntityService, useClass: MockCountryPageService }
            ]
         }
      });

      fixture = TestBed.createComponent(CountryPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
