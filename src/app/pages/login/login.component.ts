import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registry: string;
  username: string;
  password: string;

  constructor(private auth: AuthService,
              private angulartics2: Angulartics2,
              private router: Router) { }

  ngOnInit() {
    this.registry = this.auth.registry;
    this.username = this.auth.username;
    this.password = this.auth.password;
  }

  login() {
    this.auth.save(this.registry, this.username, this.password);
    this.angulartics2.eventTrack.next({
      action: 'login',
      properties: { 'registry': this.registry },
    });
    this.router.navigate(['/repositories']);
  }
}
