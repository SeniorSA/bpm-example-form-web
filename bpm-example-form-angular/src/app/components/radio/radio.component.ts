import { Component } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

  radios: any = [
    {
      id: "radio",
      label: "Opção 1"
    },
    {
      id: "radio",
      label: "Opção 2"
    },
    {
      id: "radio",
      label: "Opção 3"
    },
    {
      id: "radio",
      label: "Opção 4"
    },
    {
      id: "radio",
      label: "Opção 5"
    },
  ]
}
