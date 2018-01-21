import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registry: string;
  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.registry = this.auth.registry;
    this.username = this.auth.username;
    this.password = this.auth.password;
  }

  login() {
    this.auth.save(this.registry, this.username, this.password);
    this.router.navigate(['/repositories']);
  }
}
