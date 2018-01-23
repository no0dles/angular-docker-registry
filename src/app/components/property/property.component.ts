import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent {

  @Input()
  label: string;

  @Input()
  value: string;

}
