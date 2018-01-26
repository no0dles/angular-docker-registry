import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RepositoriesComponent} from './pages/repositories/repositories.component';
import {RepositoryComponent} from './pages/repository/repository.component';
import {RegistryService} from './services/registry.service';
import { TagComponent } from './pages/tag/tag.component';
import { RegistriesComponent } from './pages/registries/registries.component';
import { LoginComponent } from './pages/login/login.component';
import {IsLoggedInService} from './guards/is-logged-in.service';
import {IsLoggedOutService} from './guards/is-logged-out.service';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { PropertyComponent } from './components/property/property.component';
import { LabelsComponent } from './components/labels/labels.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Angulartics2Module} from 'angulartics2';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    RepositoryComponent,
    TagComponent,
    RegistriesComponent,
    LoginComponent,
    LogoutComponent,
    PropertyComponent,
    LabelsComponent,
    EnvironmentsComponent,
    SpinnerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    RouterModule.forRoot([
      {path: '', redirectTo: '/repositories', pathMatch: 'full'},
      {path: 'login', component: LoginComponent, canActivate: [IsLoggedOutService]},
      {path: 'logout', component: LogoutComponent, canActivate: [IsLoggedInService]},
      {path: 'repositories', component: RepositoriesComponent, canActivate: [IsLoggedInService]},
      {path: 'repositories/:repo/:name', component: RepositoryComponent, canActivate: [IsLoggedInService]},
      {path: 'repositories/:repo/:name/tag/:tag', component: TagComponent, canActivate: [IsLoggedInService]},
    ]),
  ],
  providers: [
    AuthService,
    RegistryService,
    IsLoggedInService,
    IsLoggedOutService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
