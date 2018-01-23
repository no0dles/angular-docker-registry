import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss'],
})
export class EnvironmentsComponent {

  @Input()
  environments: string[];

  getValue(env: string) {
    if (env) {
      const parts = env.split('=');
      return parts
        .splice(1, parts.length - 1)
        .join('=');
    }
    return '';
  }

  getLabel(env: string) {
    if (env) {
      return env.split('=')[0];
    }
    return '';
  }
}
