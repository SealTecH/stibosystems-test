import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AbstractEntityPage, EntityService } from '../abstract-entity.page';
import { Payment } from '../common/interfaces';
import { PaymentPageService } from './payment-page.service';

@Component({
   selector: 'app-payment-page',
   standalone: true,
   imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, RouterModule, MatButtonModule],
   templateUrl: './payment-page.component.html',
   styleUrls: ['./payment-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [{ provide: EntityService, useClass: PaymentPageService }]
})
export class PaymentPageComponent extends AbstractEntityPage<Payment> implements OnInit {

}
