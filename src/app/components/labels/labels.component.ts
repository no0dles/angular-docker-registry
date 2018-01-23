import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent {

  @Input()
  labels: { [key: string]: string };

  get keys() {
    if (this.labels) {
      return Object.keys(this.labels);
    }
    return [];
  }

}
