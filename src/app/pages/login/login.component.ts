import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';
import {RegistryService} from '../../services/registry.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  registryUrl: string;
  username: string;
  password: string;

  loggingIn = false;
  loggedIn = false;
  success = false;

  constructor(private auth: AuthService,
              private registry: RegistryService,
              private angulartics2: Angulartics2,
              private router: Router) {
  }

  ngOnInit() {
    this.registryUrl = this.auth.registryUrl;
    this.username = this.auth.username;
    this.password = this.auth.password;
  }

  login() {
    this.loggingIn = true;

    if (this.registryUrl && !this.registryUrl.startsWith('http')) {
      this.registryUrl = `https://${this.registryUrl}`;
    }

    this.registry.login(this.registryUrl, this.username, this.password).subscribe(res => {
      this.loggingIn = false;
      this.loggedIn = true;
      this.success = res;

      if (res) {
        this.auth.save(this.registryUrl, this.username, this.password);
        this.angulartics2.eventTrack.next({
          action: 'login',
          properties: {'registry': this.registry},
        });
        this.router.navigate(['/repositories']);
      }
    });

  }
}
