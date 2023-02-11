import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EntityType } from '../common/enums';

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [CommonModule, MatButtonModule],
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
   readonly entitiesList = Object.values(EntityType);
   constructor(private router: Router) {
   }

   navigate(destination: string): void {
      this.router.navigate([destination]);
   }
}
