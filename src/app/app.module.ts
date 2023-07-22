import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { OverviewComponent } from './components/overview/overview.component';
import { ResourcesComponent, Upgrade } from './components/resources/resources.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { ResearchComponent } from './components/research/research.component';
import { FleetComponent, modifyFleet, shipDetail } from './components/fleet/fleet.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AdminComponent } from './components/admin/admin.component';
import { DefenseComponent } from './components/defense/defense.component';
import { MapComponent } from './components/map/map.component';
import { MenubuttonComponent } from './components/menubutton/menubutton.component';
import { PlayerComponent } from './components/player/player.component';
import { MessageComponent } from './components/message/message.component';
import { PopupComponent } from './components/popup/popup.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
    OverviewComponent,
    ResourcesComponent,
    BuildingsComponent,
    ResearchComponent,
    FleetComponent,
    AlliancesComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    RankingComponent,
    AdminComponent,
    DefenseComponent,
    MapComponent,
    MenubuttonComponent,
    PlayerComponent,
    MessageComponent,
    PopupComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    Upgrade,
    modifyFleet,
    shipDetail,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatDialogModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
