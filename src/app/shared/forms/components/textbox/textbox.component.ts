import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { CoreTypes } from "@nativescript/core";
import { QuestionOptions } from "~/app/core/models/report-item";
import { ReportControl } from "../../classes/report-control";

type TextboxType = string | number | "integer";

export interface TextboxReportItemOptions extends QuestionOptions<unknown> {
  hint?: string;
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  unit?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  placeholder?: string;
}

export class TextboxReportItem extends ReportControl<unknown> {
  component = TextboxComponent;
  controlType: string = "textbox";
  keyboardType?: CoreTypes.KeyboardInputType;
  returnKeyType?: CoreTypes.ReturnKeyButtonType;
  hint: string;
  unit: string;
  maxLength?: number;
  placeholder: string;
  constructor(options: TextboxReportItemOptions) {
    super(options);
    this.keyboardType = options.keyboardType;
    this.returnKeyType = options.returnKeyType;
    this.hint = options.hint || "";
    this.unit = options.unit || "";
    this.placeholder = options.placeholder || ""
    this.maxLength = options.maxLength;

    if (options.maxLength) {
      this.formControl.addValidators(Validators.maxLength(options.maxLength))
    }

    if (options.minLength) {
      this.formControl.addValidators(Validators.minLength(options.minLength))
    }

    if (options.min) {
      this.formControl.addValidators(Validators.min(options.min))
    }

    if (options.max) {
      this.formControl.addValidators(Validators.max(options.max))
    }

  }
}

@Component({
  selector: "afriknow-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
})
export class TextboxComponent {
  @Input() question!: TextboxReportItem;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question?.formControl;
    return control?.invalid && control?.touched;
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
