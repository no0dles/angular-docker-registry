import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  registryUrl: string;
  username: string;
  password: string;

  load() {
    this.registryUrl = localStorage.getItem('registryUrl');
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
  }

  save(registry: string, username: string, password: string) {
    localStorage.setItem('registryUrl', registry);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    this.load();
  }

  clear() {
    this.save('', '', '');
  }

  isAuthenticated() {
    return this.registryUrl && this.registryUrl.length > 0 && this.registryUrl !== 'undefined' &&
      this.username && this.username.length > 0 && this.username !== 'undefined' &&
      this.password && this.password.length > 0 && this.password !== 'undefined';
  }

  getBasicAuthBearer(auth?: { username: string, password: string }) {
    if (!auth) {
      auth = {username: this.username, password: this.password};
    }
    const bearer = btoa(`${auth.username}:${auth.password}`);
    return `Basic ${bearer}`;
  }
}
