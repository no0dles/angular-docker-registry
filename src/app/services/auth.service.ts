import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  registry: string;
  username: string;
  password: string;

  load() {
    this.registry = localStorage.getItem('registry');
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
  }

  save(registry: string, username: string, password: string) {
    if (registry && !registry.startsWith('http')) {
      registry = `https://${registry}`;
    }
    localStorage.setItem('registry', registry);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    this.load();
  }

  clear() {
    this.save('', '', '');
  }

  isAuthenticated() {
    return this.registry && this.registry.length > 0 && this.registry !== 'undefined' &&
      this.username && this.username.length > 0 && this.username !== 'undefined' &&
      this.password && this.password.length > 0 && this.password !== 'undefined';
  }

  getBasicAuthBearer() {
    const auth = btoa(`${this.username}:${this.password}`);
    return `Basic ${auth}`;
  }
}
