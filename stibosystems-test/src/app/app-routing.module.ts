import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from '../list-page/list-page.component';
import { EntityType } from '../common/enums';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { CountryPageComponent } from '../country-page/country-page.component';
import { PaymentPageComponent } from '../payment-page/payment-page.component';

const routes: Routes = [{
   path: EntityType.Users,
   component: ListPageComponent,
   data: {
      entityType: EntityType.Users
   }
},
{
   path: EntityType.Countries,
   component: ListPageComponent,
   data: {
      entityType: EntityType.Countries
   }
},
{
   path: EntityType.Payments,
   component: ListPageComponent,
   data: {
      entityType: EntityType.Payments
   }
},

{
   path: `${EntityType.Users}/:id`,
   component: UserPageComponent
},
{
   path: `${EntityType.Payments}/:id`,
   component: PaymentPageComponent
},

{
   path: `${EntityType.Countries}/:id`,
   component: CountryPageComponent
},
{
   path: '',
   component: DashboardComponent
},
{
   path: '**',
   redirectTo: ''
}];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
