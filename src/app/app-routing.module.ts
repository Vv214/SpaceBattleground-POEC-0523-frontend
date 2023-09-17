
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterComponent } from './components/register/register.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResearchComponent } from './components/research/research.component';
import { MessageComponent } from './components/message/message.component';
import { ShipyardComponent } from './components/shipyard/shipyard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'fleet', component: FleetComponent },
  { path: 'alliances', component: AlliancesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'shipyard', component: ShipyardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
