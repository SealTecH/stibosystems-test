import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AbstractEntityPage, EntityService } from '../abstract-entity.page';
import { Country } from '../common/interfaces';
import { CountryPageService } from './country-page.service';

@Component({
   selector: 'app-country-page',
   standalone: true,
   imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, RouterModule, MatButtonModule],
   templateUrl: './country-page.component.html',
   styleUrls: ['./country-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [{ provide: EntityService, useClass: CountryPageService }]
})
export class CountryPageComponent extends AbstractEntityPage<Country> {

}
