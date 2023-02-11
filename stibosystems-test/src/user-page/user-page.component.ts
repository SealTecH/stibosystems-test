import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AbstractEntityPage, EntityService } from '../abstract-entity.page';
import { User } from '../common/interfaces';
import { UserPageService } from './user-page.service';

@Component({
   selector: 'app-user-page',
   standalone: true,
   imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, RouterModule, MatButtonModule],
   templateUrl: './user-page.component.html',
   styleUrls: ['./user-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [{ provide: EntityService, useClass: UserPageService }]
})
export class UserPageComponent extends AbstractEntityPage<User> implements OnInit {

}
