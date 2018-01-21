import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RepositoriesComponent} from './components/repositories/repositories.component';
import {RepositoryComponent} from './components/repository/repository.component';
import {RegistryService} from './services/registry.service';
import { TagComponent } from './components/tag/tag.component';
import { RegistriesComponent } from './components/registries/registries.component';
import { LoginComponent } from './components/login/login.component';
import {IsLoggedInService} from './guards/is-logged-in.service';
import {IsLoggedOutService} from './guards/is-logged-out.service';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    RepositoryComponent,
    TagComponent,
    RegistriesComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
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
