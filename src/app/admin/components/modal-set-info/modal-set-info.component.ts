import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-set-info',
  templateUrl: './modal-set-info.component.html'
})
export class ModalSetInfoComponent implements OnInit{
  @Input() adminFirstName!: string|null;
  @Input() adminLastName!: string|null;
  @Input() adminContact!: string|null;
  @Input() adminType!: string|null;

  ngOnInit(): void {
    console.log("dans le moda! "+ this.adminContact);
  }
}
