import { Component, Input } from "@angular/core";
import { FormArray } from "@angular/forms";

@Component({
  selector: "afriknow-form-item",
  templateUrl: "./form-item.component.html",
})
export class FormItemComponent {
  @Input() public form: FormArray;

  constructor() {}
}
