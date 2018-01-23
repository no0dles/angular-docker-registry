import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService,
              angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

  }

  ngOnInit() {
    this.auth.load();
  }
}
